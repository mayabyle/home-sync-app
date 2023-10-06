import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.scss";

const styles = {
    wrap: {
      display: "flex"
    },
    left: {
      marginRight: "10px"
    },
    main: {
      flexGrow: "1"
    }
  };

function Calendar( {isHome} ) {
    const calendarRef = useRef();
    
    const editEvent = async (e) => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
        if (!modal.result) { 
            return; 
        }
        e.data.text = modal.result;
        dp.events.update(e);
      };

      const timeRangeSelectedHandling = isHome ? "Disabled" : "Enabled";
    
      const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: timeRangeSelectedHandling,
        onTimeRangeSelected: async args => {
          const dp = calendarRef.current.control;
          const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
          dp.clearSelection();
          if (!modal.result) { return; }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          });
        },
        onEventClick: async args => {
          await editEvent(args.e);
        },
        contextMenu: new DayPilot.Menu({
          items: [
            {
              text: "Delete",
              onClick: async args => {
                const dp = calendarRef.current.control;
                dp.events.remove(args.source);
              },
            },
            {
              text: "-"
            },
            {
              text: "Edit...",
              onClick: async args => {
                await editEvent(args.source);
              }
            }
          ]
        }),
        onBeforeEventRender: args => {
          args.data.areas = [
            {
              top: 3,
              right: 3,
              width: 20,
              height: 20,
              // symbol: "icons/daypilot.svg#minichevron-down-2",
              fontColor: "#fff",
              toolTip: "Show context menu",
              action: "ContextMenu",
            },
            {
              top: 3,
              right: 25,
              width: 20,
              height: 20,
              // symbol: "icons/daypilot.svg#x-circle",
              fontColor: "#fff",
              action: "None",
              toolTip: "Delete event",
              onClick: async args => {
                const dp = calendarRef.current.control;
                dp.events.remove(args.source);
              }
            }
          ];
    
    
          const participants = args.data.participants;
          if (participants > 0) {
            // show one icon for each participant
            for (let i = 0; i < participants; i++) {
              args.data.areas.push({
                bottom: 5,
                right: 5 + i * 30,
                width: 24,
                height: 24,
                action: "None",
                image: `https://picsum.photos/24/24?random=${i}`,
                style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
              });
            }
          }
        }
      });
    
    useEffect(() => {
        // TODO load calendar events from db
        const events = [
          {
            id: 1,
            text: "Event 1",
            start: "2023-09-24T10:30:00",
            end: "2023-09-24T13:00:00",
            participants: 2,
          },
          {
            id: 2,
            text: "Event 2",
            start: "2023-09-27T09:30:00",
            end: "2023-09-27T11:30:00",
            backColor: "#6aa84f",
            participants: 1,
          },
        ];
    
        const startDate = "2023-09-24";
    
        calendarRef.current.control.update({startDate, events});
      }, []);

    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
          startDate: args.day
        });
    }

    return (
        <div style={styles.wrap}>
            {!isHome ? 
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"Week"}
                        showMonths={1}
                        skipMonths={1}
                        onTimeRangeSelected={handleTimeRangeSelected}
                    />
                </div> 
                : undefined
            }
            <div style={styles.main}>
                <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
            </div>
        </div>
    )
}

export default Calendar;
import React, { useState, useRef, useEffect } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.scss";
import axios from 'axios';


function Calendar( {isHomePage} ) {
    const calendarRef = useRef();
    
    const editEvent = async (e) => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
        if (!modal.result) { 
            return; 
        }
        try {
          const res = axios.put(`/calendar/${e.id()}`, { text: modal.result })
          console.log(res)
        } catch(e) { console.log(e) }
        e.data.text = modal.result;
        dp.events.update(e);
    };

    // const timeRangeSelectedHandling = isHomePage ? "Disabled" : "Enabled";
    
    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        // durationBarVisible: false,
        timeRangeSelectedHandling: isHomePage ? "Disabled" : "Enabled",
        // timeZone: "Asia/Jerusalem", 
        onTimeRangeSelected: async args => {
          const dp = calendarRef.current.control;
          const modal = await DayPilot.Modal.prompt("Create a new event:", "New event");
          dp.clearSelection();
          if (!modal.result) { return; }
          // create event objects and add to database
          const newEvent = {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          }
          const fixedStart = new DayPilot.Date(args.start);
          const fixedEnd = new DayPilot.Date(args.end);
          const fixedEvent = {
            start: fixedStart.addHours(3),
            end: fixedEnd.addHours(3),
            id: DayPilot.guid(),
            text: modal.result
          }
          try {
            const res = await axios.post(`/calendar`, fixedEvent)
          } catch(e) {
            console.log(e)
          }
          // add new event to the callendar ref
          dp.events.add(newEvent);
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
                try {
                  axios.delete(`/calendar/${args.source.id()}`)
                } catch(e) { console.log(e) }
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
              fontColor: "#fff",
              // backgroundColor: "#111",
              toolTip: "Show context menu",
              action: "ContextMenu",
              html: '<div style="font-size: 20px;color: #b9e7e7;">&#10247;</div>', // 3dots icon
            },
            // {
            //   top: 3,
            //   right: 25,
            //   width: 20,
            //   height: 20,
            //   fontColor: "#fff",
            //   action: "None",
            //   toolTip: "Delete event",
            //   onClick: async args => {
            //     const dp = calendarRef.current.control;
            //     dp.events.remove(args.source);
            //   }
            // }
          ];
        }
    });
        
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`/calendar`)
                let events = res.data
                console.log(events)
                let todayDate = new Date()
                calendarRef.current.control.update({todayDate, events});
            } 
            catch(err) { 
              console.log(err) 
            }
        }
        fetchEvents()
    }, []);

    // handle week select in month box
    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
          startDate: args.day
        });
    }

    
    return (
        <div style={styles.wrap}>
            {!isHomePage ? 
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

export default Calendar;
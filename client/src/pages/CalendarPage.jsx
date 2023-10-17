import React from 'react';
import Calendar from "../components/Calendar";

function CalendarPage() {
    return (
        <div className="calendar">
            <Calendar isHomePage={false}/>
        </div>
    )
}

export default CalendarPage;
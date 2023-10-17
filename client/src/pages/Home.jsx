import React from 'react';
import Calendar from "../components/Calendar";

const notifications = [
    {
        id: 1,
        time: "10:52",
        content: "Maya reserved the living room on Thursday starting at nine",
    },
    {
        id: 2,
        time: "11:00",
        content: "Bar added milk to shopping list",
    },
    {
        id: 3,
        time: "20:00",
        content: "Shir was shopping at the supermarket",
    },
];

function Home() {
    return (
        <div className="home">
            {/* TODO fix notifications */}
            <Calendar isHomePage={true}/>
            <div className="notifications">
                <h4>Notifications:</h4>
                {notifications.map(not => (
                    <div className="notification" key={not.id}>
                        <h5>{not.time+" -  "+not.content}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
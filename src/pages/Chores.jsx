import React from "react";

const chores = [
    {
        id: 1,
        task: "Take the trash out",
        incharge: "Maya",
    },
    {
        id: 2,
        task: "Clean the house",
        incharge: "Everyone",
    },
    {
        id: 3,
        task: "Change the light bulb",
        incharge: "Bar",
    },
];

function Chores() {
    return (
        <div className="chores">
            {/* to add weekly calendar */}
            {/* notifications */}
            <h4>Notifications:</h4>
            {chores.map(chore => (
                <div className="notification" key={chore.id}>
                    <h5>{chore.incharge+" -  "+chore.task}</h5>
                </div>
            ))}
        </div>
    )
}

export default Chores;
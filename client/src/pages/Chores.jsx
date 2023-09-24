import React from "react";
import { useState } from "react";

// const chores = [
//     {
//         id: 1,
//         task: "Take the trash out",
//         incharge: "Maya",
//     },
//     {
//         id: 2,
//         task: "Clean the house",
//         incharge: "Everyone",
//     },
//     {
//         id: 3,
//         task: "Change the light bulb",
//         incharge: "Bar",
//     },
// ];

function Chores() {
    const [chore, setChore] = useState("");
    const [incharge, setIncharge] = useState("");  //TODO change into list or check box
    const [chores, setChores] = useState([]);

    const addChore = () => {
        setChores([...chores, {chore, incharge}]);
        setChore("");
        setIncharge("");
    };

    const deleteChore = (text) => {
        const newChores = chores.filter((chore) => {
          return chore !== text;
        });
        setChores(newChores);
      };

    return (
        <div className="chores">
            <h4>chores:</h4>
            <form>
                <input type="text" name="chore" value={chore} placeholder="Create a new chore" onChange={(e) => { setChore(e.target.value) }} />
                {/* <input type="text" name="incharge" value={incharge} placeholder="incharge" onChange={(e) => { setIncharge(e.target.value) }} /> */}
                <div className="incharge-box">
                    <label>
                        <input type="checkbox" name="roomates" value="bar" id="1" />
                        Bar
                    </label>
                    <label>
                        <input type="checkbox" name="roomates" value="maya" id="2" />
                        Maya
                    </label>
                </div>
            </form>
            <button className="add-button" onClick={ addChore }>
                Add
            </button>

            {chores?.length > 0 ? (
                <ul className="chore-list">
                    {chores.map((chore, index) => (
                        <div className="chore">
                            <li key={index}> 
                            <h5>{chore.incharge+" -  "+chore.chore}</h5>
                            </li>
                            <button className="delete-button" onClick={() => { deleteChore(chore) }} >
                                Delete
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>No task found</p>
                </div>
            )}
        </div>
    )
}

export default Chores;
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

function Chores() {
    const [desc, setDesc] = useState("");
    const [incharge, setIncharge] = useState("");  //TODO change into list or check box
    const [chores, setChores] = useState([]);

    useEffect(() => {
        const fetchChores = async () => {
            try {
                const res = await axios.get(`/chores`)
                setChores(res.data)
            } 
            catch(err) { console.log(err) }
        }
        fetchChores()
    },[])

    const handleAdd = async () => {
        try {
            const res = await axios.post(`/chores`, {desc, incharge})
            const newChore = res.data
            setChores([...chores, { id: newChore.id, desc: newChore.desc, incharge: newChore.incharge }]);
        } 
        catch(e) { console.log(e) }
        
        setDesc("");
        setIncharge("");
    };

    const handleDelete = async (toDelete) => {
        const res = await axios.delete(`/chores/${toDelete.id}`)
        console.log(res.data)
        const newChores = chores.filter((chore) => {
            return chore !== toDelete;
        });
        setChores(newChores);
      };

    return (
        <div className="chores">
            <h4>chores:</h4>
            <form>
                <input type="text" name="desc" value={desc} placeholder="Create a new chore" onChange={(e) => { setDesc(e.target.value) }} />
                <input type="text" name="incharge" value={incharge} placeholder="incharge" onChange={(e) => { setIncharge(e.target.value) }} />
                {/* <div className="incharge-box">
                    <label>
                        <input type="checkbox" name="roomates" value="bar" id="1" />
                        Bar
                    </label>
                    <label>
                        <input type="checkbox" name="roomates" value="maya" id="2" />
                        Maya
                    </label>
                </div> */}
            </form>
            <button className="add-button" onClick={ handleAdd }> Add </button>

            {chores?.length > 0 ? (
                <ul className="chore-list">
                    {chores.map((chore) => (
                        <div className="chore" key={chore.id}>
                            <li> 
                                <h5>{chore.desc+" -  "+chore.incharge}</h5>
                            </li>
                            <button className="delete-button" onClick={() => { handleDelete(chore) }} >
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
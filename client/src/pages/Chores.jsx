import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function Chores() {
    const [desc, setDesc] = useState("");
    const [incharge, setIncharge] = useState("");  
    const [chores, setChores] = useState([]);
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        const fetchChores = async () => {
            try {
                const choresRes = await axios.get(`/chores`)
                setChores(choresRes.data)
                console.log(choresRes.data)
                const tenantsRes = await axios.get(`/settings/tenants`)
                setTenants(tenantsRes.data[0].tenants)
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

    const handleCheckboxChange = (tenant) => {
        const isChecked = incharge.includes(tenant);
        if (isChecked) {
            setIncharge(incharge.filter((t) => t !== tenant));
        } else {
            setIncharge([...incharge, tenant]);
        }
      };

    return (
        <div className="chores-container" style={{marginTop:'20px'}} >
            <form className="chores-form" style={{ backgroundColor: "#f0f0f0", maxWidth:'60%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h4>Create a new chore</h4>
                <input
                  type="text"
                  name="desc"
                  value={desc}
                  placeholder="Chore name"
                  onChange={(e) => setDesc(e.target.value)}
                />       
                <div className="incharge-box" style={{display:'flex'}}>      
                <h4 style={{marginTop:'0px', marginRight:'20px'}}>incharge:</h4>    
                {tenants.map((tenant) => (
                    <div key={tenant}>
                      <label>
                            <input
                                type="checkbox"
                                name="incharge"
                                value={tenant}
                                checked={incharge.includes(tenant)}
                                onChange={() => handleCheckboxChange(tenant)}
                            />
                            {tenant}
                        </label>
                    </div>
                ))}
                </div>
                <button className="add-button" onClick={ handleAdd }> Add </button>
            </form>
            

            {chores?.length > 0 ? (
                <ul className="chore-list">
                    {chores.map((chore) => (
                        <div className="chore" key={chore.id}>
                            <li style={{display:'flex', marginTop:'0px'}}> 
                                <h5 style={{marginTop:'0px', marginRight:'20px'}}>{chore.desc+" -  "+chore.incharge}</h5>
                                <FontAwesomeIcon icon={faTimes} onClick={() => handleDelete(chore)} />
                            </li>
                            
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>No tasks found</p>
                </div>
            )}
        </div>
    )
}

export default Chores;
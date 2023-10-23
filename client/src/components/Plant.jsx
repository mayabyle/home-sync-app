import React, { useState } from "react";
import NewPlantCard from "./NewPlantCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function Plant({ plant, handleDelete, handleUpdate, upload }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPlant, setEditedPlant] = useState({ ...plant });

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const imgUrl = await upload(file);
            setEditedPlant({ ...editedPlant, img: imgUrl });
        }
    };

    const handleSave = () => {
        console.log(editedPlant)
        handleUpdate(editedPlant);
        setIsEditing(false);
    }

    const handleCancle = () => {
        setIsEditing(false) 
        setEditedPlant({ ...plant })
    }

    return (    
        <div className="plant">
            {!isEditing ?
            <>
                <div className="img">
                    { plant.img ? 
                        <img src={`../uploads/${plant.img}`} alt="" /> :
                        <img src={`../uploads/general.png`} alt="" /> 
                    }
                </div>
                <div className="content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '22px', marginTop: '0' }}>{plant.name}</h3>
                        {plant.desc && <p style={{ fontSize: '22px' }}>
                            - {plant.desc} </p>}
                    </div>
                    {plant.last_water && <p style={{ fontSize:'14px' }}> <b>last date watered:    </b> {plant.last_water}</p>}
                    {plant.preferences && <p style={{ fontSize:'14px' }}> <b>water preferences:    </b> {plant.preferences}</p>}
                </div>
                <div className="icons">
                    <FontAwesomeIcon icon={faEdit} onClick={toggleEdit} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(plant.id)} />
                </div>
            </> 
            
            :

            <>

            <div className="img">
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    name=""
                    onChange={handleImageChange}
                />
                <label className="file" htmlFor="file" style={{ cursor: 'pointer' }}>
                    <img
                        src={`../uploads/${editedPlant.img}`} // Replace with the path to your image
                        alt="Upload Image"
                    />
                </label>
            </div>

                <div className="content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '22px', marginTop: '0' }}>
                            <input
                                type="text"
                                value={editedPlant.name}
                                onChange={(e) => setEditedPlant({ ...editedPlant, name: e.target.value })}
                            />
                        </h3>                        
                        {plant.desc && <p style={{ fontSize: '22px' }}>
                        -   <input
                                type="text"
                                value={editedPlant.desc}
                                onChange={(e) => setEditedPlant({ ...editedPlant, desc: e.target.value })}
                            />
                        </p>}
                    </div>

                    <div className="date">
                        <label htmlFor="dateInput">last water date:</label>
                        <input
                            type="date"
                            id="dateInput"
                            value={editedPlant.last_water}
                            onChange={(e) => setEditedPlant({ ...editedPlant, last_water: e.target.value })}
                        />
                    </div>

                    <div className="waterInfo" >
                        <h4 style={{marginBottom:'0px'}}>how often to water?</h4>
                        <div className="water-option">
                            <input
                                type="radio"
                                id="opt1"
                                name="waterOpt"
                                checked={editedPlant.preferences === "when the soil is completely dry"}
                                value="when the soil is completely dry"
                                onChange={(e) => setEditedPlant({ ...editedPlant, preferences: e.target.value })}
                            />
                            <label htmlFor="opt1">when the soil is completely dry</label>
                        </div>
                        <div className="water-option">
                            <input
                                type="radio"
                                id="opt2"
                                name="waterOpt"
                                checked={editedPlant.preferences === "when the topsoil is dry"}
                                value="when the topsoil is dry"
                                onChange={(e) => setEditedPlant({ ...editedPlant, preferences: e.target.value })}
                            />
                            <label htmlFor="opt2">when the topsoil is dry</label>
                        </div>
                        <div className="water-option">
                            <input
                                type="radio"
                                id="opt3"
                                name="waterOpt"
                                checked={editedPlant.preferences === "always keep it moist"}
                                value="always keep it moist"
                                onChange={(e) => setEditedPlant({ ...editedPlant, preferences: e.target.value })}
                            />
                            <label htmlFor="opt3">always keep it moist</label>
                        </div>
                        <div className="water-option">
                            <input
                                type="radio"
                                id="opt4"
                                name="waterOpt"
                                checked={editedPlant.preferences === "very rarely"}
                                value="very rarely"
                                onChange={(e) => setEditedPlant({ ...editedPlant, preferences: e.target.value })}
                            />
                            <label htmlFor="opt4">very rarely</label>
                        </div>
                    </div> 
                </div>

                <div className="icons" style={{bottom:'0px'}}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancle}>Cancle</button>
                </div>
            </>
            }
        </div>
    )
}

export default Plant;
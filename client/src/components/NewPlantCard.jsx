// TODO make this a dropdowncard and call it when "I got new plant" is clicked
import React, {useState} from "react";
import axios from "axios";

function NewPlantCard({ updatePlants, upload, handleCloseCard }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [waterDate, setWaterDate] = useState("");
    const [preferences, setPreferences] = useState("");
    const [img, setImg] = useState(null);

    const handleAddPlantButton = async (e) => {
        e.preventDefault()
        const imgUrl = await upload(img);
        try {
            const res = await axios.post(`/plants`, {name, desc, waterDate, preferences, img: img?imgUrl:"",})
            const newPlant = res.data
            updatePlants(newPlant.id, newPlant.name, newPlant.desc, newPlant.waterDate, newPlant.preferences, newPlant.img) 
        } catch(err) {
            console.log(err)
        }   
        handleCloseCard(); 
    }

    return (
        <div className="add-plant">               
            <div className="content">
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    style={{ height: '7px',
                             padding: '10px',
                             border: '1px solid lightgray' }}
                />
                <textarea
                    type="Content"
                    placeholder="Description (optional)"
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ height: '50px',
                             border: '1px solid lightgray'  }}
                />
            </div>
            <div className="waterInfo">
                <h4>how often to water?</h4>
                <div className="water-option">
                    <input
                        type="radio"
                        id="opt1"
                        name="waterOpt"
                        checked={preferences === "when the soil is completely dry"}
                        value="when the soil is completely dry"
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    <label htmlFor="opt1">when the soil is completely dry</label>
                </div>
                <div className="water-option">
                    <input
                        type="radio"
                        id="opt2"
                        name="waterOpt"
                        checked={preferences === "when the topsoil is dry"}
                        value="when the topsoil is dry"
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    <label htmlFor="opt2">when the topsoil is dry</label>
                </div>
                <div className="water-option">
                    <input
                        type="radio"
                        id="opt3"
                        name="waterOpt"
                        checked={preferences === "always keep it moist"}
                        value="always keep it moist"
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    <label htmlFor="opt3">always keep it moist</label>
                </div>
                <div className="water-option">
                    <input
                        type="radio"
                        id="opt4"
                        name="waterOpt"
                        checked={preferences === "very rarely"}
                        value="very rarely"
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    <label htmlFor="opt4">very rarely</label>
                </div>
            </div> 
            <div className="date">
                <label htmlFor="dateInput">last water date:</label>
                <input
                    type="date"
                    id="dateInput"
                    value={waterDate}
                    onChange={(e) => setWaterDate(e.target.value)}
                />
            </div>
            <div className="buttons" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '10px'}}>
                <div className="upload">
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file" style={{ background: 'white', 
                                                                    border: '1px solid lightgray',
                                                                    padding: '5px 5px', // Adjust the padding as needed
                                                                    display: 'inline-block',
                                                                    cursor: 'pointer' }}>
                        Upload Image
                    </label>
                </div>
                <button onClick={handleAddPlantButton} style={{ background: 'white', 
                                                                border: '1px solid rgba(0, 128, 128, 0.766)',
                                                                fontSize: '14px',
                                                                fontWeight: 'bold',
                                                                padding: '5px 5px',
                                                                display: 'inline-block',
                                                                cursor: 'pointer' }}> 
                    Add Plant 
                </button>
            </div>
        </div>
    )
}

export default NewPlantCard;
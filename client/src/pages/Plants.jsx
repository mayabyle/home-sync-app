import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

function Plants() {
    const [plants, setPlants] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [waterDate, setWaterDate] = useState("");
    const [preferences, setPreferences] = useState("");
    const [img, setImg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/plants`)
                console.log(res.data)
                setPlants(res.data)
            } catch (err) {
                console.log(err);
            }
          };
        fetchData();
    },[])

    const upload = async () => {
        //TODO change cloudinary
        //TODO check cloudinary vs upload strait to server(multer)
        try {
            const formData = new FormData();
            formData.append("img", img);
            const res = await axios.post("/upload", formData);
            const url = res.data
            return url;
        } catch (err) {
            console.log(err);
        }
      };

    const handleClick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload();
        console.log(imgUrl)
        try {
            const res = await axios.post(`/plants`, {name, desc, waterDate, preferences, img: img?imgUrl:"",})
            const newPlant = res.data
            setPlants([...plants, { id: newPlant.id, 
                                    name: newPlant.name, 
                                    desc: newPlant.desc, 
                                    waterDate: newPlant.waterDate,
                                    preferences: newPlant.preferences, 
                                    img: newPlant.img
            }]);        
        } catch(err) {
            console.log(err)
        }    
    }

    return (
        <div className="plants">
            <div className="add-plant">
                {/* TODO make i got new plant as a button that open dynamicly add plant window */}
                <a>
                    <h2>I got new plant!</h2>
                    <button onClick={handleClick}> Add Plant </button>
                </a>   
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
                <div className="date">
                    <label htmlFor="dateInput">last water date:</label>
                    <input
                        type="date"
                        id="dateInput"
                        value={waterDate}
                        onChange={(e) => setWaterDate(e.target.value)}
                    />
                </div>
                <div className="upload">
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file" style={{ background:'white', 
                                                                    border: '1px solid lightgray',
                                                                    padding: '5px 5px', // Adjust the padding as needed
                                                                    display: 'inline-block' }}>
                        Upload Image
                    </label>
                </div>

                <div className="waterInfo">
                    <h4>how often to water?</h4>
                    <div className="water-option">
                        <input
                            type="radio"
                            id="opt1"
                            name="waterOpt"
                            checked={preferences === "when the soil is dry"}
                            value="when the soil is dry"
                            onChange={(e) => setPreferences(e.target.value)}
                        />
                        <label htmlFor="opt1">when the soil is dry</label>
                    </div>
                    <div className="water-option">
                        <input
                            type="radio"
                            id="opt2"
                            name="waterOpt"
                            checked={preferences === "always keep it moist"}
                            value="always keep it moist"
                            onChange={(e) => setPreferences(e.target.value)}
                        />
                        <label htmlFor="opt2">always keep it moist</label>
                    </div>
                </div> 
            </div>

        
        {plants && 
            <div className="plants-list">
                <h2>My Plants:</h2>
                {plants.map((plant) => (
                <div className="plant" key={plant.id}>
                    {console.log(plant)}
                    <div className="img">
                      { plant.img ? 
                            <img src={`../uploads/${plant.img}`} alt="" /> :
                            <img src={`../uploads/general.png`} alt="" /> }
                            {/* TODO upload a general photo of question mark */}
                            {/* TODO - show the name of img after upload */}
                    </div>
                    <div className="content">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ fontSize:'22px' }}>{plant.name}</h3>
                            {plant.desc && <p style={{ fontSize:'22px' }}>-  {plant.desc}</p>}
                        </div>
                        {plant.last_water && <p>{plant.last_water}</p>}
                        {plant.preferences && <p>{plant.preferences}</p>}
                    </div>
                </div>
                ))}
            </div>
        }

        </div>
    )
}

export default Plants;
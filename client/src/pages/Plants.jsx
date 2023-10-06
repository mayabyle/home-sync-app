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
        //TODO change cloudinary
        //TODO check cloudinary vs upload strait to server(multer)
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
            <div className="addPlant">
                {/* TODO make i got new plant as a button that open dynamicly add plant window */}
                <h1>I got new plant!</h1>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    onChange={(e) => setDesc(e.target.value)}
                />
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
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                </div>
                <button onClick={handleClick}> Add </button>

                <div className="waterInfo">
                    <h1>how often to water?</h1>
                    <div className="waterOption">
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
                    <div className="waterOption">
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

        <div className="showPlants">
        {plants.map((plant) => (
            <div className="plant" key={plant.id}>
                <div className="img">
                  { plant.img ? 
                        <img src={`../upload/${plant.img}`} alt="" /> :
                        <img src={`../upload/$general`} alt="" /> }  
                        {/* TODO upload a general photo of question mark */}
                </div>
                <div className="content">
                    <h3>{plant.name}</h3>
                    {plant.desc && <p>{plant.desc}</p>}
                    {plant.waterDate && <p>{plant.waterDate}</p>}
                    {plant.preferences && <p>{plant.preferences}</p>}
                </div>
            </div>
        ))}
      </div>


        </div>
    )
}

export default Plants;
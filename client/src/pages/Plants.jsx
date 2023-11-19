import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import NewPlantCard from "../components/NewPlantCard";
import Plant from "../components/Plant";

function Plants() {
    const [plants, setPlants] = useState([]);
    const [isOpenAddCard, setOpenAddCard] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/plants`)
                setPlants(res.data)
            } catch (err) {
                console.log(err);
            }
          };
        fetchData();
    },[])

    const updatePlantsList = (id, name, desc, waterDate, preferences, img) => {
        setPlants([...plants, { id, name, desc, waterDate, preferences, img }]); 
    }

    const handleButtonClick = () => {
        setOpenAddCard(!isOpenAddCard);
    }

    const handleDelete = (id) => {
        try {
            axios.delete(`/plants/${id}`)
            const newPlants = plants.filter((plant) => {
            return plant.id !== id;
            })
            setPlants(newPlants);
        } catch(e) {
            console.log(e)
        }
    }

    const upload = async (img) => {
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

    const handleUpdate = async (updatedPlant) => {
        // const imgUrl = await upload(updatedPlant.img);
        try {
            axios.put(`/plants/${updatedPlant.id}`, updatedPlant)
                .then((res) => {
                    const plantIndex = plants.findIndex((plant) => plant.id === updatedPlant.id);
                    if (plantIndex !== -1) {
                        const updatedPlants = [...plants];
                        updatedPlants[plantIndex] = updatedPlant;
                        setPlants(updatedPlants);
                    }
                })
                .catch((error) => {
                    console.error("Error updating plant:", error);
                });
        } catch (error) {
            console.error("Error updating plant:", error);
        }
    }


    return (
        <div className="plants">
            {/* TODO style the button */}
            <div className="addPlantButton">  
                <button onClick={handleButtonClick} className={isOpenAddCard ? "active" : ""}>
                    {isOpenAddCard ? "cancel" : "I got a new plant!"}
                </button>
            </div>

            {isOpenAddCard && <div className="droppdown-card">
                <NewPlantCard updatePlants={updatePlantsList} upload={upload} handleCloseCard={handleButtonClick} />
            </div>
            }

            {plants && 
                <div className="plants-list">
                    <h2>My Plants:</h2>
                    {plants.map((plant) => (
                        <Plant key={plant.id} plant={plant} handleDelete={handleDelete} handleUpdate={handleUpdate} upload={upload} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Plants;


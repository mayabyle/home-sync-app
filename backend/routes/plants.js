import express from "express";
import {db} from "../db.js";

const router = express.Router()

router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM plants" //TODO FIX apartment id
    db.query(selectQuery, (err, data) => {
        if(err) {
            return res.json("error")
        }
        // Loop through the data and format the last_water date
        data.forEach((plant) => {   //TODO make more efficiant
            if (plant.last_water) {
                const lastWaterDate = new Date(plant.last_water);
                plant.last_water = lastWaterDate.toISOString().split('T')[0];
            }
        });
        console.log(data)
        return res.json(data)
    })
})

router.post("/", (req, res) => {
    // const waterDate = new Date(req.body.waterDate);
    // const formattedWaterDate = waterDate.toISOString().split('T')[0];
    const values = [
        req.body.name,
        req.body.desc,
        req.body.waterDate,
        req.body.preferences,
        1,
        req.body.img, 
    ];
    console.log(values)

    const insertQuery = "INSERT INTO plants(`name`, `desc`, `last_water`, `preferences`, `apartmentid`, `img`) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, values, (err, insertRes) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error inserting data into the database." });
        }

        // Fetch and return the newly inserted data
        const selectQuery = "SELECT * FROM plants WHERE id = ?"; 
        db.query(selectQuery, [insertRes.insertId], (err, selectRes) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching inserted data from the database." });
            }
            return res.status(201).json(selectRes[0]);
        });
    })
})

router.delete("/:id", (req, res) => {
    const plantId = req.params.id
    const deleteQuery = "DELETE FROM plants WHERE id = ? ";

    db.query(deleteQuery, [plantId], (err, data) => {
        if (err) 
            return res.send(err);
        return res.status(200).send("Successfully deleted from plants");
  });
})

router.put("/:id", (req, res) => {
    const updatedPlant = req.body
    const plantId = req.params.id
    const updateQuery = "UPDATE plants SET ? WHERE `id` = ? ";
    db.query(updateQuery, [updatedPlant, plantId], (err, data) => {
        if (err) 
            return res.send(err);
        return res.status(200).send("Plant has Successfully updated");
  });
})

export default router;
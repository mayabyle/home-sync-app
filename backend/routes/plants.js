import express from "express";
import {db} from "../db.js";

const router = express.Router()

router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM plants" //TODO FIX apartment id
    db.query(selectQuery, (err, data) => {
        if(err) {
            return res.json("error")
        }
        // console.log(data)
        return res.json(data)
    })
})

router.post("/", (req, res) => {
    // console.log(req.body)
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

export default router;
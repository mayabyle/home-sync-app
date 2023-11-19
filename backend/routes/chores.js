import express from "express";
import {db} from "../db.js";

const router = express.Router()

router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM chores WHERE apartmentid = ?" //TODO check that works
    db.query(selectQuery, [req.apartmentId], (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.json(data)
    })
})

router.post("/", (req, res) => {
    const values = [
        req.body.desc,
        JSON.stringify(req.body.incharge), 
        req.apartmentId,
    ];

    const insertQuery = "INSERT INTO chores(`desc`, `incharge`, `apartmentid`) VALUES (?)";
    db.query(insertQuery, [values], (err, insertRes) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting data into the database." });
        }

        // Fetch and return the newly inserted data
        const selectQuery = "SELECT * FROM chores WHERE id = ?"; 
        db.query(selectQuery, [insertRes.insertId], (err, selectRes) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching inserted data from the database." });
            }
            return res.status(201).json(selectRes[0]);
        });
    })
})

router.delete("/:id", (req, res) => {
    const choreId = req.params.id
    const deleteQuery = "DELETE FROM chores WHERE id = ? ";

    db.query(deleteQuery, [choreId], (err, data) => {
        if (err) 
            return res.send(err);
        return res.status(200).send("Successfully deleted from chores");
  });
})

export default router;
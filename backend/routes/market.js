import express from "express";
import {db} from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const selectQuery = "SELECT name, quantity, isSelected FROM items WHERE apartmentid = ?" //TODO FIX by apartment id
    db.query(selectQuery, [req.apartmentId], (err, data) => {
        if(err) {
            return res.json("error with select query from items")
        }
        return res.json(data)
    })
})

router.post("/", (req, res) => {
    const values = [
        req.body.name,
        1,  //quantity
        0,  //isSelected
        req.apartmentId
    ];

    const insertQuery = "INSERT INTO items(`name`, `quantity`, `isSelected`, `apartmentid`) VALUES (?)";
    db.query(insertQuery, [values], (err, insertRes) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error inserting data into the database." });
        }
        return res.status(200).json("event inserted successfully")
    })
})

//edit event
router.put("/:name", (req, res) => {
    const name = req.params.name
    const quantity = req.body.quantity
    const updateQuery = "UPDATE items SET `quantity` = ? WHERE (`name` = ?) and (`apartmentid` = ?)"
    db.query(updateQuery, [quantity, name, req.apartmentId], (err, updateRes) => {
      if (err) {
        console.error("Database error:", err); 
        return res.status(500).json({ error: "Error updating data in the database" })
      }
      return res.status(200).json("item updated successfully");
    });
  });

export default router;
import express from "express";
import {db} from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const selectQuery = "SELECT name, quantity, isSelected FROM items" //TODO FIX by apartment id
    db.query(selectQuery, (err, data) => {
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
        1,  //apartment id TODO fix
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
    // console.log(name, quantity)
    const updateQuery = "UPDATE items SET `quantity` = ? WHERE `name` = ?"
    db.query(updateQuery, [quantity, name], (err, updateRes) => {
      if (err) {
        console.error("Database error:", err); // Log the error for debugging
        return res.status(500).json({ error: "Error updating data in the database" })
      }
      return res.status(200).json("item updated successfully");
    });
  });

export default router;
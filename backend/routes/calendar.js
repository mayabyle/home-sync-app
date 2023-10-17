import express from "express";
import {db} from "../db.js";

const router = express.Router()

// const events = [
//     {
//       id: 1,
//       text: "Event 1",
//       start: "2023-10-13T10:30:00",
//       end: "2023-10-13T13:00:00",
//       participants: 2,
//     },
//     {
//       id: 2,
//       text: "Event 2",
//       start: "2023-10-14T09:30:00",
//       end: "2023-10-14T11:30:00",
//       backColor: "#6aa84f",
//       participants: 1,
//     },
// ];

router.get("/", (req, res) => {
  const selectQuery = "SELECT * FROM events" //TODO FIX select by apartment id
  db.query(selectQuery, (err, data) => {
    if(err) {
      return res.json("error")
    }
    return res.json(data)
  })
})

// add event
router.post("/", (req, res) => {
  console.log(req.body)
  const values = [
    req.body.id,
    req.body.text, 
    req.body.start,
    req.body.end, 
    1,
  ];
  console.log(values)
  const insertQuery = "INSERT into events(`id`, `text`, `start`, `end`, `apartmentid`) VALUES (?)"
  db.query(insertQuery, [values], (err, insertRes) => {
    if (err) {
      return res.status(500).json({ error: "Error inserting data into the database." });
    }
    return res.status(200).json("event inserted successfully")
  })
})

//edit event
router.put("/:id", (req, res) => {
  const id = req.params.id
  const text = req.body.text
  const updateQuery = "UPDATE events SET `text` = ? WHERE `id` = ?"
  db.query(updateQuery, [text, id], (err, updateRes) => {
    if (err) {
      console.error("Database error:", err); // Log the error for debugging
      return res.status(500).json({ error: "Error updating data in the database" })
    }
    return res.status(200).json("event updated successfully");
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id
  const deleteQuery = "DELETE FROM events WHERE id = ? ";

  db.query(deleteQuery, [id], (err, data) => {
      if (err) 
          return res.send(err);
      return res.status(200).send("Successfully deleted from events");
});
})


export default router;
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ambacyda1!",
    database: "apartment"
})

// db.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the database:", err);
//     } else {
//       console.log("Connected to the database!");
//     }
// });


app.get("/", (req,res) => {
    res.json("hello im backend")
})

app.get("/chores", (req, res) => {
    const selectQuery = "SELECT * FROM chores"
    db.query(selectQuery, (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.json(data)
    })
})

app.post("/chores", (req, res) => {
    const values = [
        req.body.desc,
        req.body.incharge,
        // "",  //TODO - to support roomies incharge
    ];

    const insertQuery = "INSERT INTO chores(`desc`, `incharge`) VALUES (?)";
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

app.delete("/chores/:id", (req, res) => {
    const choreId = req.params.id
    const deleteQuery = "DELETE FROM chores WHERE id = ? ";

    db.query(deleteQuery, [choreId], (err, data) => {
        if (err) 
            return res.send(err);
        return res.status(200).send("Successfully deleted from chores");
  });
})

////////////////////////////////////////////////////////////////////////////////////////

app.listen(3001, ()=> {
    console.log("connectet to backend!")
})












/*
const chores = [
    {
        id: 1,
        task: "Take the trash out",
        incharge: "Maya",
    },
    {
        id: 2,
        task: "Clean the house",
        incharge: "Everyone",
    },
    {
        id: 3,
        task: "Change the light bulb",
        incharge: "Bar",
    },
];
*/
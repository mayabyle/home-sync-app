import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ambacyda1!",
    database: "test"
})

db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database!");
    }
  });

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

app.get("/", (req,res) => {
    res.json("hello im backend")
})

app.get("/chores", (req,res) => {
    return res.json(chores)
})

app.get("/books", (req,res) => {
    const myquery = "SELECT * FROM books"
    db.query(myquery, (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const myquery = "INSERT INTO books ('title', 'desc', 'cover') VALUES (?)"
    const val = ["tit", "desc", "pic"]
    db.query(myquery, (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.json(data)
    })
})


////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, ()=> {
    console.log("connectet to backend!")
})
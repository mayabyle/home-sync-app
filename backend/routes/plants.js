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

export default router;
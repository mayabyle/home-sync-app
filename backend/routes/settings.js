import express from "express";
import {db} from "../db.js";

const router = express.Router()

////////////////////////////// Tenants //////////////////////////////

router.get("/tenants", (req,res) => {
    const selectQuery = "SELECT `tenants` FROM apartments WHERE id = ?"
    db.query(selectQuery, 1, (err, data) => { //TODO fix apartment id
        if(err) {
            return res.json("error")
        }
        return res.status(200).json(data)
    })
})

router.put("/:name", (req, res) => {
    const newTenant = req.params.name

    const insertQuery = "INSERT INTO debts(`apartmentid`, `name`, `amount`) VALUES (?, ?, ?)";
    const updateQuery = "UPDATE apartments SET tenants = JSON_ARRAY_APPEND(COALESCE(tenants, '[]'), '$', ?) WHERE id = '1'";
    db.query(updateQuery, [newTenant], (err, data) => {
        if (err) {
            return res.send(err);
        }
        // Add the tenant to debts table with amount 0
        const insertQuery = "INSERT INTO debts(`apartmentid`, `name`, `amount`) VALUES (?, ?, ?)";
        const values = [1, newTenant, 0]
        db.query(insertQuery, values, (err, insertRes) => {
            if (err) {
                console.log(err)
                return res.send(err);
            }    
        })
        return res.status(200).send("Tenent has been added updated");
    });
})

//////////////////////////////  //////////////////////////////

export default router;
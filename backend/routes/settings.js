import express from "express";
import {db} from "../db.js";

const router = express.Router()

////////////////////////////// Tenants //////////////////////////////

router.get("/tenants", (req,res) => {
    const selectQuery = "SELECT `tenants` FROM apartments WHERE id = ?"
    db.query(selectQuery, [req.apartmentId], (err, data) => { 
        if(err) {
            return res.json("error")
        }
        return res.status(200).json(data)
    })
})

router.put("/:name", (req, res) => {
    const newTenant = req.params.name

    const updateQuery = "UPDATE apartments SET tenants = JSON_ARRAY_APPEND(COALESCE(tenants, '[]'), '$', ?) WHERE id = ?";
    db.query(updateQuery, [newTenant, req.apartmentId], (err, data) => {
        if (err) {
            return res.send(err);
        }
        // Add the tenant to debts table with amount 0
        const insertQuery = "INSERT INTO debts(`apartmentid`, `name`, `amount`) VALUES (?, ?, ?)";
        const values = [req.apartmentId, newTenant, 0]
        db.query(insertQuery, values, (err, insertRes) => {
            if (err) {
                console.log(err)
                return res.send(err);
            }    
        })
        return res.status(200).send("Tenent has been added updated");
    });
})

router.delete("/:name", (req, res) => {
    const toDeleteTenant = req.params.name

    const updateQuery = "UPDATE apartments SET tenants = JSON_SET(COALESCE(tenants, '[]'), '$', JSON_REMOVE(COALESCE(tenants, '[]'), ?)) WHERE id = ?";
    console.log(`Generated JSON path: $[?(@ == "${toDeleteTenant}")]`);
    db.query(updateQuery, [`$[?(@ == "${toDeleteTenant}")]`, req.apartmentId], (err, data) => {
        if (err) {
            console.log(err)
            return res.send(err);
        }
        // TODO remove the tenant from debts table with amount 0
        return res.status(200).send("Tenant has been removed");
    });
})

//////////////////////////////  //////////////////////////////

export default router;
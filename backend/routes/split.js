import express from "express";
import {db} from "../db.js";

const router = express.Router()

router.get("/", (req,res) => {
    const selectQuery = "SELECT * FROM payments WHERE apartmentid = ?"
    db.query(selectQuery, [req.apartmentId], (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.status(200).json(data)
    })
})

router.get("/debts", (req,res) => {
    const selectQuery = "SELECT * FROM debts WHERE apartmentid = ? AND amount != 0" // TODO apa id
    db.query(selectQuery, [req.apartmentId], (err, data) => {
        if(err) {
            return res.json("error")
        }
        return res.status(200).json(data)
    })
})

router.post("/", (req, res) => {
    const debts = req.body.debts 
    const apartmentId = req.apartmentId

    const values = [
        req.body.desc,
        req.body.sum,
        req.body.date,
        req.body.paidBy,
        req.body.splitWay, 
        JSON.stringify(debts),
        apartmentId,
    ];
    const insertQuery = "INSERT INTO payments(`desc`, `sum`, `date`, `paidBy`, `splitWay`, `debts`, `apartmentid`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(insertQuery, values, (err, insertRes) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error inserting data into the database." });
        }
        const updateQuery = "UPDATE debts SET amount = amount + ? WHERE apartmentid = ? AND name = ?";
        for (const person in debts) {
            if(debts[person] == 0)
                continue
            const debtAmount = debts[person];
            const updateValues = [debtAmount, apartmentId, person];  
            db.query(updateQuery, updateValues, (err, updateRes) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error updating debts in the database." });
                }
            });
        }
        res.status(200).json({ message: "Payment recorded and debts updated successfully." });
    })
})

router.delete("/:id", (req, res) => {
    const billId = req.params.id
    const deleteQuery = "DELETE FROM payments WHERE id = ? ";

    db.query(deleteQuery, [billId], (err, data) => {
        if (err) 
            return res.send(err);
        const bill = JSON.parse(req.query.bill)  
        const debts = bill.debts  
        const updateQuery = "Update debts SET amount = amount - ? WHERE apartmentid = ? AND name = ?";

        for (const person in debts) {
            const debtAmount = debts[person];
            if(debtAmount == 0)
                continue
            const updateValues = [debtAmount, bill.apartmentid, person]; 
            db.query(updateQuery, updateValues, (err, updateRes) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error updating debts in the database." });
                }
            });
        }
        return res.status(200).json({ message: "Payment recorded and debts updated successfully." });
    });
})

export default router;
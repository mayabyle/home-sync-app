import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.json("user data")
})

router.get("/register", (req, res) => {
    res.json("register works")
})

export default router;
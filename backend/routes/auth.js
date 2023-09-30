// for Login and Register
import express from "express";
import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post("/register", (req, res) => {
    const user = req.body

    //check if user exists
    const selectQuery = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(selectQuery, [user.email, user.username], (err, data) => {
        if(err)
            return res.json(err)
        if(data.length)
            return res.status(409).json("User already exists!")
        
        //Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);

        const insertQuery = "INSERT INTO users(`username`,`email`,`password`, `apartment_id`) VALUES (?)";
        const newUser = [user.username, user.email, hashedPassword, 1];  //TODO fix dynamic apartment id

        db.query(insertQuery, [newUser], (err, data) => {
            if (err) 
                return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
});

router.post("/login", (req, res) => {
    const user = req.body

    //CHECK EXISTING USER
    const selectQuery = "SELECT * FROM users WHERE username = ?"
    db.query(selectQuery, [user.username], (err, data) => {
        if(err)
            return res.json(err)
        if(!data.length)
            return res.status(409).json("User not exists!")

        const dbUser = data[0]; // Get the first row from the query result
        if (user.username !== dbUser.username)
            return res.status(409).json("Wrong username")
        
        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            user.password,
            dbUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong password!");
        
        const token = jwt.sign({ id: dbUser.id }, "jwtkey");  //TODO understand better JWT
        const { password, ...other } = dbUser;

        res
            .cookie("access_token", token, { //TODO understand better cookieParser
                httpOnly: true,
            })
            .status(200)
            .json(other);
    });
});

router.post("/logout", (req, res) => {
    res.json("auth data")
});

export default router;
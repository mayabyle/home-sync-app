import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import apartmentRoutes from "./routes/apartments.js"
import choreRoutes from "./routes/chores.js"


const app = express()
app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/apartments", apartmentRoutes)
app.use("/api/chores", choreRoutes)

////////////////////////////////////////////////////////////////////////////////////////

app.listen(3001, ()=> {
    console.log("connectet to backend!")
})

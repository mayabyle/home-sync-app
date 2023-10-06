import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import multer from "multer"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import apartmentRoutes from "./routes/apartments.js"
import choreRoutes from "./routes/chores.js"
import plantsRoutes from "./routes/plants.js"


const app = express()
app.use(cors())
app.use(express.json());
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +"-"+ file.originalname)
    }
})
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('img'), function(req, res) {
    const image = req.file
    return res.status(200).json(image.filename)
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/apartments", apartmentRoutes)
app.use("/api/chores", choreRoutes)
app.use("/api/plants", plantsRoutes)

////////////////////////////////////////////////////////////////////////////////////////

app.listen(8800, ()=> {
    console.log("connectet to backend!")
})

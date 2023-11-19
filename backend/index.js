import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import multer from "multer"
import jwt from 'jsonwebtoken';

import authRoutes from "./routes/auth.js"
import apartmentRoutes from "./routes/apartments.js"
import choreRoutes from "./routes/chores.js"
import plantsRoutes from "./routes/plants.js"
import calendarRoutes from "./routes/calendar.js"
import marketRoutes from "./routes/market.js"
import splitRoutes from "./routes/split.js"
import settingRoutes from "./routes/settings.js"


const app = express()
app.use(cors())
app.use(express.json());
app.use(cookieParser())

///////////////// authenticate middleware /////////////////

const authenticateMiddleware = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, 'jwtkey');
        req.apartmentId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

///////////////// router /////////////////

app.use("/api/auth", authRoutes)
app.use("/api/apartments", authenticateMiddleware, apartmentRoutes)
app.use("/api/chores", authenticateMiddleware, choreRoutes)
app.use("/api/plants", authenticateMiddleware, plantsRoutes)
app.use("/api/calendar", authenticateMiddleware, calendarRoutes)
app.use("/api/market", authenticateMiddleware, marketRoutes)
app.use("/api/split", authenticateMiddleware, splitRoutes)
app.use("/api/settings", authenticateMiddleware, settingRoutes)

///////////////// upload plant img using multer /////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
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

////////////////////////////////////////////////////////////////////////////////////////

app.listen(8800, ()=> {
    console.log("connectet to backend!")
})

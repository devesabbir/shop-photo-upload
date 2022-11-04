import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'
const __dirname = path.resolve()
import bodyParser from "body-parser";

import userRoute  from  "./api/routes/UserRoute.js"
import adminRoute  from "./api/routes/AdminRoute.js";
import productRoute from './api/routes/ProductRoute.js'
import ErrorHandle from "./api/middlewares/ErrorHandle.js";

// Middlewares  
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended:false }))
// Cookie Parser 
app.use(cookieParser()) 

// cors
app.use(cors({
    "origin": "*",
    "optionsSuccessStatus": 200
}))

// Routing
app.use('/api/user',  userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/product', productRoute)

app.use('/upload', express.static(path.join(__dirname, '/api/upload')))
// Handel Error 
app.use( ErrorHandle )

export default app; 

  
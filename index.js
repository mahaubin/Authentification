const express = require("express")
require('dotenv').config();
const connexionDB=require('./config/db');
const cookieParser =require("cookie-parser")
const userRoute = require('./route/userRoute')
const privateRoute = require('./route/privateRoute')

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/api/user",userRoute)
app.use("/api",privateRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, (req,res)=>{
    connexionDB()
    console.log(`app run on port ${PORT}`)
})

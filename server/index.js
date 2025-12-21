const express = require('express');
const cors = require('cors');
require('dotenv').config() ;

const app = express() ;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res)=>{
    res.send("ApplyFlow API is running");
})


const PORT = process.env.PORT || 5000 ;

const connectDB = require("./config/db");

connectDB();


app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');

const authRoutes  = require("./routes/authRoutes")
const testRoutes  = require("./routes/testRoutes")
const jobRoutes = require("./routes/jobRoutes")
require('dotenv').config() ;

const app = express() ;

// middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/jobs", jobRoutes);

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
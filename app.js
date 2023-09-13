const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const movieRouter = require("./routes/movies");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING,{}).then(()=>{
console.log("Connected to mongoDB");
}).catch((err)=>{
    console.log(err);
});

const loggerMiddleWare= (req,res, next)=>{
    const type = req.method;

    
    fs.appendFile(path.join(__dirname , "log.txt"),type + "\n",()=>{console.log(type)});
    next();
};

app.use(loggerMiddleWare);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/movies", movieRouter);

app.listen(PORT, ()=>{
console.log(`Server Up N' Runnin on port:${PORT}!`);
})
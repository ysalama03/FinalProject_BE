const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    release:{type:Date, default:new Date()},
    rating:{type:Number,required:false},
    watched:{type:Number,required:false}
  
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
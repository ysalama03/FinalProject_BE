const express = require("express");
const router = express.Router();
const Movie= require("../schema");

const movies = [];

router.get("/", async(req,res)=>{
    const q = req.query.search;
    const movies = await Movie.find({title : {$regex : new RegExp(q,"i")}}).sort({release: 1});
    res.send(movies);
});

router.post("/", (req,res)=>{
console.log("post");
//console.log(req);
const body = req.body;

if(body.title && body.description){
const newMovie = new Movie({
    title: body.title,
    description: body.description,
})
if(body.release){
   newMovie.release = body.release
};
if(body.rating){
    newMovie.rating = body.rating
};
if(body.watched){
    newMovie.watched = body.watched
};


newMovie.save();

res.send(newMovie);
}else{
    res.send({error:true, message : "invalid entry"});
}
});

router.put("/:id",async(req,res)=>{
    const id = req.params.id;
    const body = req.body;

    if(!id){
        res.send({error:true, message : "id undefined"});
        return;
    }

   const movie= await Movie.findOneAndUpdate({_id : id}, {...body},{new: true});
   res.send(movie);
});

router.delete("/:id",async(req,res)=>{
    const id = req.params.id;
     
    if(!id){
        res.send({error:true, message : "id undefined"});
        return;
    }
 
    const result = await Movie.findByIdAndDelete(id);
    res.send(result);
});

module.exports= router;
import express from "express";
import db from "./db/movies.json"
 
const PORT = process.env.PORT || 1234

const app = express();

app.get("/api", (req,res) =>{
    res.json(db.info);

})

app.get("/api/movies", (req, res) =>{
    res.json(db.movies);
})

app.get("/api/movies/:id", (req, res) =>{
    const { id } = req.params;
    const movie = db.movies.find((movie: any) => movie.id === id)
    if(!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie)
})

app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`)
})


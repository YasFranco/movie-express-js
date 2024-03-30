import express from "express";
import moviesRouter from "./routes/movies";
 
const PORT = process.env.PORT || 1234

const app = express();

app.use(express.json())

app.get("/api", (req, res) => { 
    res.json(
        {
            "name": "My App",
            "description": "A Movies Database API",
            "version": "1.0.0"
        }
    )
})

app.use("/api", moviesRouter)

app.use("*", (req,res) =>{
    res.status(404).json({error:"Not Found"})
})

app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`)
})


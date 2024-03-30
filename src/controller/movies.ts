
import MoviesModel from "../model/movies";
import { Request, Response } from "express";
import crypto from "node:crypto"


abstract class MoviesController {
    static getAll = (req: Request, res: Response) => {
        const movies = MoviesModel.getAll();
        if (!movies) return res.status(500).json({error: "Server error"})
        res.json(movies)
    }

    static getMovieById = (req: Request, res: Response) => {
        const { id } = req.params;
        const movie = MoviesModel.getMovieById(id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie)
    }

    static createMovie = (req: Request, res: Response) => {
        const { name, year, director, cast, rating } = req.body;
        const id = crypto.randomUUID();

        const newMovie = { id, name, year,director, cast, rating}
        const response = MoviesModel.createMovie(newMovie)
        if(response instanceof Error) {
            return res.status(500).json({error: "Error to create movie"});

        } 
        res.json(newMovie)
    }
}

export default MoviesController
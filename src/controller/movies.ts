
import MoviesModel from "../model/movies";
import { Request, Response } from "express";
import crypto from "node:crypto"
import zod from "zod"
import { validateMovie } from "../validators/movies";



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

        const responseValidator = validateMovie(req.body)
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error)
        }
        const { name, year, director, cast, rating } = req.body;
        const id = crypto.randomUUID()

        const newMovie = { id, name, year,director, cast, rating}
        const response = MoviesModel.createMovie(newMovie)
        if(response instanceof Error) {
            return res.status(500).json({error: "Error to create movie"});

        } 
        res.json(newMovie)
    }

    static updateMovie = (req: Request, res: Response) => {

        const responsePartialValidator = validateMovie(req.body)
        if(!responsePartialValidator.success){
            return res.status(400).send(responsePartialValidator.error)
        }
        // Recepcionar los datos y enviarselos al modelo.

        // El parametro id viene en la url de la req
        const { id } = req.params;
        // El cuerpo de la req viene en el objeto req.body
        // Destructuro las propiedades de req.body
        const { name, year, director, cast, rating } = req.body

        const objMovie = { id, name, year, director, cast, rating }
        
        const response = MoviesModel.updateMovie(objMovie)
    
        if(!response.message) {
            res.status(400).json({error: "Error to update movie"})
        }

        res.json(response);
    }

    static deleteMovie = (req: Request, res: Response) => {
        const { id } = req.params;
        const response = MoviesModel.deleteMovie(id);

        res.json(response)
    }
}

export default MoviesController
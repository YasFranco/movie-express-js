import {Router} from "express";
import MoviesController from "../controller/movies";


const moviesRouter = Router();

// GET
moviesRouter.get("/movies", MoviesController.getAll)
moviesRouter.get("/movies/:id", MoviesController.getMovieById)

// POST
moviesRouter.post("/movies", MoviesController.createMovie)

// PATCH
moviesRouter.patch("/movies/:id", MoviesController.updateMovie)

// DELETE
moviesRouter.delete("/movies/:id", MoviesController.deleteMovie)
export default moviesRouter;
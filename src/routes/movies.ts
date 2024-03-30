import {Router} from "express";
import MoviesController from "../controller/movies";


const moviesRouter = Router();

moviesRouter.get("/movies", MoviesController.getAll)
moviesRouter.get("/movies/:id", MoviesController.getMovieById)
moviesRouter.post("/movies", MoviesController.createMovie)

export default moviesRouter;
import db from "../db/movies.json"
import fs from "node:fs"


abstract class MoviesModel {
    static getAll = () => {
        return db.movies
    };

    static getMovieById = (id: string) => {
        const movie = db.movies.find((movie: any) => movie.id === id)
        return movie;
    };

    static createMovie = (newMovie: any) => {
        db.movies.push(newMovie);
        try {
            fs.writeFileSync("./src/db/movies.json", JSON.stringify(db))

        } catch (error) {
            return new Error() 
        }
    }

    static updateMovie = (objMovie: any) => {

        const { id, name, year, director, cast, rating } = objMovie;
        const movie = db.movies.find((movie) => movie.id === id)

        if(!movie) {
            return { error: "Movie not found."}
        }

        if(name) movie.name = name;
        if (year) movie.year = year;
        if (director) movie.director = director;
        if (cast) movie.cast = cast;
        if (rating) movie.rating = rating;

        try {
            fs.writeFileSync("./src/db/movies.json", JSON.stringify(db))
        } catch (error) {
            return new Error() 
        }

        return {message: "Succesfully modified movie"}

    }

    static deleteMovie = (id: any) => {
        const movie = db.movies.find((movie) => movie.id === id);
        if(!movie) return { error: "Movie not found"};

        const movieDelete = db.movies.filter((movie) => movie.id !== id);
        db.movies = movieDelete;


        try {
            fs.writeFileSync("./src/db/movies.json", JSON.stringify(db))
        } catch (error) {
            return new Error() 
        }

        return {message: "Successfully delete movie"}

    }
}

export default MoviesModel
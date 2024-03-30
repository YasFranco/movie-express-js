import zod from "zod"

// VALIDACIONES SIN ZOD 
// if(!name) return res.status(400).json({error: "Falta el nombre"})
// if(!rating) return res.status(400).json({error: "Falta el rating"});
// if(rating < 1 || rating > 10) return res.status(400).json({error: "Rating fuera de rango"})
// VALIDACIONES CON ZOD
const movieEchema = zod.object({
    name: zod.string(),
    year: zod.number().int().min(1850).max(2024),
    director: zod.string(),
    cast: zod.array(zod.string()),
    rating: zod.number().min(1).max(10).int()
})

const validateMovie = (objMovie: any) => {
    const responseValidator = movieEchema.safeParse(objMovie);
    return responseValidator
}

const validatePartialMovie = (objMovie: any) => {
    const responseValidator = movieEchema.partial().safeParse(objMovie);
    return responseValidator
}

export { validateMovie, validatePartialMovie }
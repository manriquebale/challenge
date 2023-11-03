import { Request, Response, NextFunction } from "express";
import Movie from "./movies.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options: any = {};
    //    const { year } = req.query
    //    options.year = 2001

        
        // Default ASC
        if (req.query.sort) {
            options.sort = req.query.sort;
        }

//        console.log(options)

        const movies = await Movie.find({}, null, options);
        return res.status(200).json(movies);
    } catch (error) {
        return next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (movie === null) return next(res.status(404).json({
            message: 'Movie not found'
        }))
        return res.status(200).json(movie);
    } catch (error) {
        return next(error);
    }
};

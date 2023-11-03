import { Request, Response, NextFunction } from "express";
import Director from "./directors.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const directors = await Director.find();
        return res.status(200).json(directors);
    } catch (error) {
        return next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (director === null) return next(res.status(404).json({
            message: 'Director not found'
        }))
        return res.status(200).json(director);
    } catch (error) {
        return next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, dateOfBirth, nationality, biography } = req.body;
        const newDirector = new Director({
            name,
            dateOfBirth,
            nationality,
            biography
        });
        const director = await newDirector.save();
        return res.status(201).json(director);
    } catch (error) {
        return next(error);
    }
};
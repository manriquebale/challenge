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

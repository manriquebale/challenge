import { Request, Response, NextFunction } from "express";
import Show from "./shows.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shows = await Show.find();
        return res.status(200).json(shows);
    } catch (error) {
        return next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const show = await Show.findById(id);
        if (show === null) return next(res.status(404).json({
            message: 'Show not found'
        }))
        return res.status(200).json(show);
    } catch (error) {
        return next(error);
    }
};

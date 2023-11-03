import { Request, Response, NextFunction } from "express";
import Actor from "./actors.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const actors = await Actor.find();
        return res.status(200).json(actors);
    } catch (error) {
        return next(error);
    }
};

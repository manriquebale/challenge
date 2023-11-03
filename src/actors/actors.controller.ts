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


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, dateOfBirth, nationality, biography } = req.body;
        const newActor = new Actor({
            name,
            dateOfBirth,
            nationality,
            biography
        });
        const actor = await newActor.save();
        return res.status(201).json(actor);
    } catch (error) {
        return next(error);
    }
};
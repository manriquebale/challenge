import { Request, Response, NextFunction } from "express";
import User from "../users/users.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user === null) return next(res.status(404).json({
            message: 'User not found'
        }))
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

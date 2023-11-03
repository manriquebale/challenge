import { Request, Response, NextFunction } from 'express';
import User from '../users/users.model'
import IUser from '../users/users.interface';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        let user: IUser = new User({
            name,
            email,
            password,
        });

        const userDB = await User.findOne({ email: req.body.email });
        if(userDB) return res.status(500).json('This email is already registered');

        if (await user.savePassword() === false) {
            return res.status(400).json({
                message: 'Error saving password'
            });
        }
        await user.save();
        return res.json(user);
    } catch (err) { return next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.password) return res.status(401).json({
            message: 'Unauthorized'
        });

        const correctPassword = await user.validatePassword(req.body.password);
        if (!correctPassword)
            return res.status(401).json({
                message: 'Invalid data'
            });

        const token: string = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET || '');
        user.refreshToken = refreshToken;
        await user.save();
        return res.header('auth-token', token).json({ user, token });
    } catch (error) { return next(error); }
}


export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.body.refreshToken; 
        
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const token: string = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        return res.json({ token });
    } catch (error) {
        return next(error);
    }
};

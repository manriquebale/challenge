import { Document } from 'mongoose'

export default interface IUser extends Document {
    name: string
    email: string
    password: string
    refreshTokens: string[];
    validatePassword(password: string): Promise<boolean>
    savePassword(): Promise<boolean>
}
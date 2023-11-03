import { Document } from 'mongoose'

export default interface IActors extends Document {
    name: string;
    dateOfBirth: Date,
    nationality: string,
    biography: string,
}

import { Document, Schema } from 'mongoose'

export default interface IDirectors extends Document {
    name: string;
    dateOfBirth: Date,
    nationality: string,
    biography: string,
    movies: (Schema.Types.ObjectId | string)[];
}
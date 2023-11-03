import { Document, Schema } from 'mongoose'

export default interface IMovie extends Document {
    title: string;
    year: number;
    director: Schema.Types.ObjectId | string;
    actors: (Schema.Types.ObjectId | string)[];
}
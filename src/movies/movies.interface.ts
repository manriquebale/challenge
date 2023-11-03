import { Document } from 'mongoose'

export default interface IMovie  extends Document {
    title: string;
    director: string;
    year: number;
    other: string;
}

import { Schema, model, models } from 'mongoose';
import  IMovie from "./movies.interface"  

const MovieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: [true, 'Obligatory name'] 
    },
    year: {
        type: Number,
    },
    director: String,
    other: String

},{
        timestamps: { createdAt: true, updatedAt: true }
})
export default model<IMovie>('Movie', MovieSchema)
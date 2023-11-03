
import { Schema, model, models } from 'mongoose';
import IMovie from "./movies.interface"

const MovieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: [true, 'The title is mandatory']
    },
    year: {
        type: Number,
    },
    director: { type: Schema.Types.ObjectId, ref: 'Director' },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
}, {
    timestamps: { createdAt: true, updatedAt: true }
})
export default model<IMovie>('Movie', MovieSchema)
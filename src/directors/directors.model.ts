
import { Schema, model } from 'mongoose';
import  IDirector from "./directors.interface"  

const DirectorSchema = new Schema<IDirector>({
    name: {
        type: String,
        required: [true, 'The name is mandatory']
    },
    dateOfBirth: Date,
    nationality: String,
    biography: String,
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
},{
        timestamps: { createdAt: true, updatedAt: true }
})
export default model<IDirector>('Director', DirectorSchema)


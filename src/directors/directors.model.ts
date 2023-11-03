
import { Schema, model } from 'mongoose';
import  IDirector from "./directors.interface"  

const DirectorSchema = new Schema<IDirector>({
    name: {
        type: String,
        required: [true, 'Obligatory name']
    },
},{
        timestamps: { createdAt: true, updatedAt: true }
})
export default model<IDirector>('Director', DirectorSchema)


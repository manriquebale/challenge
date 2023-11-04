
import { Schema, model } from 'mongoose';
import IActor from "./actors.interface"

const ActorSchema = new Schema<IActor>({
    name: {
        type: String,
        required: [true, 'The name is mandatory']
    },
    dateOfBirth: Date,
    nationality: String,
    biography: String,
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, {
    timestamps: { createdAt: true, updatedAt: true }
})
export default model<IActor>('Actor', ActorSchema)



import { Schema, model } from 'mongoose';
import  IShow from "./shows.interface"  

const ShowSchema = new Schema<IShow>({
    name: {
        type: String,
        required: [true, 'Obligatory name']
    },
},{
        timestamps: { createdAt: true, updatedAt: true }
})
export default model<IShow>('Show', ShowSchema)


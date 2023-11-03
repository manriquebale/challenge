import { Schema, model } from "mongoose";
import IShow from "./shows.interface";

const episodeSchema = new Schema({
  title: String,
  director: { type: Schema.Types.ObjectId, ref: "Director" },

});

const seasonSchema = new Schema({
  title: String,
  episodes: [episodeSchema],
});

const ShowSchema = new Schema<IShow>(
  {
    title: {
      type: String,
      required: [true, "The title is mandatory"],
    },
    genre: String,
    year: Number,
    plot: String,
       actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    seasons: [seasonSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
export default model<IShow>("Show", ShowSchema);

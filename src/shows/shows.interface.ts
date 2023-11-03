
import { Document, Schema } from 'mongoose'

export default interface IShows  extends Document {
    title: string;
    genre: string;
    year: number;
    plot: string;
    actors: (Schema.Types.ObjectId | string)[];
    seasons: Season[];
}

interface Season {
    title: string;
    episodes: Episode[];
  }
  
  interface Episode {
    title: string;
  }
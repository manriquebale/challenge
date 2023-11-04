import { Request, Response, NextFunction } from "express";
import Movie from "./movies.model";
import Director from "../directors/directors.model";
import Actor from "../actors/actors.model";
import { SortOrder } from "mongoose";

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const title = req.query.title as string;
    const query: any = {};
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const sortOptions: { [key: string]: SortOrder } = {};

    if (sortBy) {
      sortOptions[sortBy] = sortOrder;
    }

    const movies = await Movie.find(query).sort(sortOptions).populate('director').populate('actors');
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (movie === null) return next(res.status(404).json({
      message: 'Movie not found'
    }))
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, year, director, actors } = req.body;
    let directorDocument;

    if (director && director.name) {
      directorDocument = await Director.findOne({ name: director.name });
      const { nationality, biography, dateOfBirth } = director
      if (!directorDocument) {
        directorDocument = new Director({
          name: director.name,
          nationality: nationality,
          biography: biography,
          dateOfBirth: dateOfBirth
        });
        directorDocument = await directorDocument.save();
      }
    }

    const actorDocuments = [];
    if (actors && actors.length > 0) {
      for (const actorName of actors) {
        let actorDocument = await Actor.findOne({ name: actorName });

        if (!actorDocument) {
          actorDocument = new Actor({
            name: actorName,
          });

          actorDocument = await actorDocument.save();
        }
        actorDocuments.push(actorDocument._id);
      }
    }

    const newMovie = new Movie({
      title,
      year,
      director: directorDocument ? directorDocument._id : undefined,
      actors: actorDocuments,
    });
    const movie = await newMovie.save();
    if (directorDocument) {
      directorDocument.movies.push(movie._id)
      await directorDocument.save();
    }
    return res.status(201).json(movie);
  } catch (error) {
    return next(error);
  }
};
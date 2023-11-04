import { Request, Response, NextFunction } from "express";
import Show from "./shows.model";
import Director from "../directors/directors.model";
import Actor from "../actors/actors.model";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shows = await Show.find().populate('actors');
        return res.status(200).json(shows);
    } catch (error) {
        return next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const show = await Show.findById(id);
        if (show === null) return next(res.status(404).json({
            message: 'Show not found'
        }))
        return res.status(200).json(show);
    } catch (error) {
        return next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            title,
            genre,
            year,
            plot,
            actors,
            seasons,
        } = req.body;

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

        const seasonsAndEpisodes = [];
        if (seasons && seasons.length > 0) {
            for (const season of seasons) {
                const episodes = season.episodes.map((episode: any) => {

                    return {
                      title: episode.title,
                      director: episode.director,
                    };
                  });
                seasonsAndEpisodes.push({
                    title: season.title,
                    episodes,
                });
            }
        }

        const newTVShow = new Show({
            title,
            genre,
            year,
            plot,
            actors: actorDocuments,
            seasons: seasonsAndEpisodes,
        });
        const tvShow = await newTVShow.save();

        return res.status(201).json(tvShow);
    } catch (error) {
        return next(error);
    }
};


export const getEpisode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idShow, idEpisode } = req.params;
        
        const show = await Show.findById(idShow);

        if (!show) {
            return res.status(404).json({
                message: 'Show not found'
            });
        }

        let episode = null;
        show.seasons.forEach((season) => {
            const foundEpisode = season.episodes.find(ep => ep._id.toString() === idEpisode);
            if (foundEpisode) {
                episode = foundEpisode;
            }
        });

        if (!episode) {
            return res.status(404).json({
                message: 'Episode not found'
            });
        }

        return res.status(200).json(episode);
    } catch (error) {
        return next(error);
    }
};
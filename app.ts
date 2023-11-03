import express, { Request, Response } from 'express';
require('dotenv').config()
require("./connection")
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Trying routes!');
});

var moviesRoutes = require('./src/movies/movies.routes');
app.use('/movies', moviesRoutes);

var directorsRoutes = require('./src/directors/directors.routes');
app.use('/directors', directorsRoutes);

var actorsRoutes = require('./src/actors/actors.routes');
app.use('/actors', actorsRoutes);

var showsRoutes = require('./src/shows/shows.routes');
app.use('/shows', showsRoutes);

app.listen(port, () => {
  console.log(`Application running in http://localhost:${port}`);
});
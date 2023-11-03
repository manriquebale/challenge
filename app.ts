import express, { Request, Response } from 'express';
const { marked } = require('marked');
const fs = require("fs");

require('dotenv').config()
require("./connection")

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  var readme = 'README.md';
  var output = fs.readFileSync(readme, 'utf8');
  res.send(marked(output.toString()));
});

var authRoutes = require('./src/auth/auth.routes');
app.use('/auth', authRoutes);

var usersRoutes = require('./src/users/users.routes');
app.use('/users', usersRoutes);

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
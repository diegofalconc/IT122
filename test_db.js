'use strict'

import { Movie } from "./model/movie.js";

Movie.find({}).lean()
    .then((movies) => {
        console.log(movies);
    })
    .catch(err => next(err));


Movie.findOne({"movie": "The Last Emperor" }).lean()
    .then((movie) => {
        console.log(movie);
        //res.render('details', { result: movie });
    })
    .catch(err => next(err));
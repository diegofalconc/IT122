import * as data from './data.js';
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { Movie } from "./model/movie.js";

import cors from 'cors';

const app = express();

const __dirname = path.resolve(path.dirname(''));

app.use('/api', cors());
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//API USE
app.get('/adpi/movies', (req, res) => {
    Movie.find({}).lean()
        .then((movies) => {
            res.json(movies);
        })
        .catch(err => next(err));
    
});

app.get('/api/movies/detail', (req, res, next) => {
    Movie.findOne({movie: req.query.movie }).lean()
    .then((movie) => {
        res.json(movie);
    })
    .catch(err => next(err));
});

app.get('/api/movies/detail/:movie', (req, res, next) => {
    Movie.findOne({movie: req.params.movie }).lean()
    .then((movie) => {
        res.json(movie);
    })
    .catch(err => next(err));
});

app.post("/api/v1/add", (req, res, next) => {
    console.log(req.body);
    if (!req.body._id) { // insert new document
        let movie = new Movie({movie:req.body.movie, director:req.body.director, year:req.body.year, theme:req.body.theme});
        console.log(movie)
        
        movie.save((err,newMovie) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newMovie._id});
        });
    } else { // update existing document
        Movie.updateOne({ _id: req.body._id}, {movie:req.body.movie, director: req.body.director, year: req.body.year, theme: req.body.theme }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/movies/delete/:id', (req, res, next) => {
    Movie.deleteOne({"_id":req.params.id}, (err,result) => {
        if(err) return next(err);
        res.json({"deleted": result});
    })
});



app.get('/', (req, res) => {
    Movie.find({}).lean()
        .then((movies) => {
            res.render('home', { layout: 'index', movies: JSON.stringify(movies) });
        })
        .catch(err => next(err));
    
});


app.get('/detail', (req, res, next) => {
    Movie.findOne({movie: req.query.movie }).lean()
    .then((movie) => {
        console.log(movie);
        res.render('detail', { layout: 'index', movie });
    })
    .catch(err => next(err));

});


app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});




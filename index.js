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
app.use(express.urlencoded());


//API USE
app.get('/api/movies', (req, res) => {
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

app.post('/api/movies/add', (req, res, next) => {
    console.log(req.body);

    res.json({"message": "Object has been added correctly"});
});

app.post('/api/movies/delete', (req, res, next) => {
    console.log(req.body);

    res.json({"message": "Object has been removed correctly"});
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




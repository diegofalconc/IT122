import * as data from './data.js';
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { Movie } from "./model/movie.js";

const app = express();

const __dirname = path.resolve(path.dirname(''));

app.set('view engine', 'handlebars');
app.set('port', 3000);
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'));
app.use(express.urlencoded());




app.get('/', (req, res, next) => {
    Movie.find({}).lean()
        .then((movies) => {
            console.log(movies);
            res.render('home', { layout: 'index', movies });
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




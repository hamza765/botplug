import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import query from './lib/db.js';

var app = express();
app.server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

setInterval(function() {
    http.get("http://botplug.herokuapp.com");
    http.get("http://growwithfriends.herokuapp.com/");
    http.get("http://cryptic-ridge-77637.herokuapp.com/")
    http.get("http://nameless-tor-98352.herokuapp.com/")
    http.get("http://mysterious-fortress-26926.herokuapp.com/")
    http.get("http://intense-harbor-93728.herokuapp.com/");
    http.get("https://morning-sands-81249.herokuapp.com/");
    http.get("https://mysterious-mountain-11379.herokuapp.com/");
    http.get("https://still-lake-39120.herokuapp.com/");
    http.get("https://secret-everglades-38178.herokuapp.com/");
    http.get("https://polar-citadel-57544.herokuapp.com/");
    http.get("https://stark-ravine-93008.herokuapp.com/");
    
}, 300000);

setInterval(function() {
    addpoints(function(err) {
        if (err)
            console.log(err);
    });
}, 1500000);

// addpoints(function(err) {
//         if (err)
//             console.log(err);
//     });

function addpoints(cb) {
    query(`UPDATE users SET points = points + 1 WHERE username='lazy784'`, function(err, result) {
        if (err)
            cb(err, null);
    });
}

app.get('/', function(req, res) {
    res.send('hi')
});

app.use(express.static('./client'));

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
    res.redirect(301, '/404');
});


app.server.listen(process.env.PORT || 8080);

console.log(`Started on port ${app.server.address().port}`);

export default app;

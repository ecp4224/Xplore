var express = require('express'),
    events = require('./lib/events.js'),
    hbs = require('hbs'),
    bodyParser = require('body-parser');

var app = express();

var username = "rabaya"; //TODO Change this to demo user

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home', require('./database-init.json'));
});

app.get('/myevents', function(req, res){
    res.render('myevents', require('./database-init.json'));
});

app.get('/create', function(req, res) {
    res.render('createForm');
});

app.get('/feed', function(req, res) {
    if (!req.query.type) {
        res.status(500);
        res.send("Invalid request");
        return;
    }
    var type = req.query.type;

    events.getFeedFor(type, username, function(events) {
        res.status(200).send(JSON.stringify(events));
    }, function(err) {
        res.status(500).send(err);
    });
});

app.post('/feed', function(req, res) {
    var eventObject = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        tickets: req.body.tickets,
        tags: req.body.tags
    };

    events.createEvent(eventObject, username, function(post) {
        res.status(200).send(JSON.stringify(post));
    }, function (err) {
        res.status(500).send(err);
    });
});

app.post('/feed/:postId', function(req, res){
    var postId = req.params.name;
    if (!postId) {
        req.sendStatus(500);
        return;
    }

    events.eventAction(postId, req.body.actionType, req.body.data, username, function() {
        res.status(200);
    }, function(e) {
        res.status(500).send(e);
    });
});


app.listen(3880);

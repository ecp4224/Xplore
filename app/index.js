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
    events.getFeedFor('home', username, function(events) {
      res.render('home', {
        posts: events
      });
    }, function(err) {
        res.status(500).send(err);
    });
});

app.get('/myevents', function(req, res){
    events.getFeedFor('feed', username, function(events) {
      res.render('myevents', {
        posts: events
      });
    }, function(err) {
        res.status(500).send(err);
    });
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
    var postId = req.params.postId;
    if (!postId) {
        res.status(500).send("No post id!");
        return;
    }

    events.eventAction(postId, req.body.actionType, req.body.data, username, function() {
        res.status(200).end();
    }, function(e) {
        res.status(500).send(e);
    });
});


app.listen(3880);

var express = require('express'),
    events = require('./lib/events.js'),
    exphbs = require('express-handlebars');
    bodyParser = require('body-parser');

var app = express();

var username = "rabaya"; //TODO Change this to demo user

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('home');
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

    //TODO Get feed based on type

    events.getFeedFor(type, username, function(events) {
        res.status(200);
        res.send(JSON.stringify(events));
    }, function(err) {
        res.sendStatus(500);
    });
});

app.post('/feed', function(req, res) {
    var eventObject = {
        'title': req.body.title,
        'description': req.body.description,
        'date': req.body.date,
        'time': req.body.time,
        'tickets': req.body.tickets,
        'tags': req.body.tags
    };

    event.createEvent(eventObject);

    req.sendStatus(200);
});

app.post('/feed/:postId', function(req, res){
    var postId = req.params.name;
    if (!postId) {
        req.sendStatus(500);
        return;
    }

    var actionObject = {
        'actionType': req.body.actionType,
        'data': req.body.data
    };

    //TODO Do action with post id

    req.sendStatus(200);
});


app.listen(3880);

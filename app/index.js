var express = require('express'),
    events = require('./lib/event.js'),
    exphbs = require('express-handlebars');

var app = express();

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.json());

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/create', function(req, res) {
    res.render('createForm');
});

var TEST_JSON = "[{\"id\":0,\"title\":\"Chess Club\",\"short_description\":\"Chess club meeting tuesday!\",\"description\":\"We are having a chess club meeting this thrusday and we're looking for people!\",\"date\":\"2/26/2015\",\"time\":\"3:00PM\",\"tickets\":[{\"role\":\"coach\",\"taken\":1},{\"role\":\"score_keeper\",\"taken\":0}]},{\"id\":0,\"title\":\"Chess Club\",\"short_description\":\"Chess club meeting tuesday!\",\"description\":\"We are having a chess club meeting this thrusday and we're looking for people!\",\"date\":\"2/26/2015\",\"time\":\"3:00PM\",\"tickets\":[{\"role\":\"coach\",\"taken\":1},{\"role\":\"score_keeper\",\"taken\":0}]},{\"id\":0,\"title\":\"Chess Club\",\"short_description\":\"Chess club meeting tuesday!\",\"description\":\"We are having a chess club meeting this thrusday and we're looking for people!\",\"date\":\"2/26/2015\",\"time\":\"3:00PM\",\"tickets\":[{\"role\":\"coach\",\"taken\":1},{\"role\":\"score_keeper\",\"taken\":0}]}]";
app.get('/feed', function(req, res) {
    if (!req.query.type) {
        res.sendStatus(500);
        res.send("Invalid request");
        return;
    }
    var type = req.query.type;

    //TODO Get feed based on type
    res.send(TEST_JSON);
    req.sendStatus(200);
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


app.listen(80);

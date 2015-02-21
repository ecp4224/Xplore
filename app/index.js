var express = require('express');
var app = express();

app.set('views', '/views');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home');
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
});

app.listen(80);
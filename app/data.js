//var Firebase = require('firebase');
//var myRootRef = new Firebase('https://scorching-inferno-8193.firebaseio.com');
//var databaseInit = require('./database-init.json');
//myRootRef.set(databaseInit);

var DataManager = require('./lib/data-manager');

//DataManager.getUserWithUserName( 'rabaya', function( err, data ) {
//	console.log( err || data );
//});
//
//DataManager.getPostById( '1', function( err, data ) {
//	console.log( err || data );
//});

var post = {
    "title": "Hackathon Too",
    "description": "GenTech Student Hackathon Too!",
    "date": "2/26/2015",
    "time": "3:00PM",
    "tickets": [
        {
            "role": "coach",
            "taken": 1
        },
        {
            "role": "score_keeper",
            "taken": 0
        }
    ]
}

//DataManager.addPost( post, function( err, data ) {
//    console.log( err || data );
//});
var user = {
    "email": "foo",
    "uid": 1,
    "interests": [
        "chess",
        "swimming"
    ],
    "events": [
        1,
        2
    ]
}
//DataManager.addUser( 'foo', user, function( err, data ) {
//    console.log( err || data );
//});

DataManager.getPosts( function( err, data ) {
    console.log( err || data );
})
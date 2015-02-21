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
    "id": 1,
    "title": "Chess Club",
    "location": "20 Evans Way, Boston MA 02115",
    "description": "We are having a chess club meeting this thrusday and we're looking for people!",
    "date": "2/26/2015",
    "timeStart": "3:00PM",
    "timeEnd": "5:00PM",
    "tickets": [
        {
            "role": "coach",
            "taken": 1
        },
        {
            "role": "score_keeper",
            "taken": 0
        }
    ],
    "tags": ["chess", "hackathon", "tags are cool o.o"]
}

//DataManager.updatePost( 1, post );

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

//DataManager.getPosts( function( err, data ) {
//    console.log( err || data );
//});
//
//DataManager.addEventToUser('rabaya', 5, function( err, data ) {
//    console.log( err || data );
//});
// var Firebase = require('firebase');
// var myRootRef = new Firebase('https://scorching-inferno-8193.firebaseio.com');
// var databaseInit = require('./database-init.json');
// myRootRef.set(databaseInit);

var DataManager = require('./lib/data-manager');

DataManager.getUserWithUserName( 'rabaya', function( err, data ) {
	console.log( err || data );
});

DataManager.getPostById( '1', function( err, data ) {
	console.log( err || data );
});
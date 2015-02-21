var Firebase = require('firebase');
var myRootRef = new Firebase('https://scorching-inferno-8193.firebaseio.com');
var databaseInit = require('./database-init.json');
myRootRef.set(databaseInit);

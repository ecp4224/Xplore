var Firebase = require('firebase');
var myRootRef = new Firebase('https://scorching-inferno-8193.firebaseio.com');

module.exports.getUserWithUserName = function(username, callback) {
    var userRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/users/'+username);
	if (userRef) {
		userRef.on('value', function(snapshot) {
			if (snapshot) {
				callback(null, snapshot.val());
			} else {
				callback(null, null);
			}
		});
	} else {
		callback( null, null );
	}
}

module.exports.getPostById = function(postId, callback) {
	var postRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/posts/'+postId);
	if (postRef) {
		postRef.on('value', function(snapshot) {
			if (snapshot) {
				callback(null, snapshot.val());
			} else {
				callback(null, null);
			}
		});
	} else {
		callback( null, null );
	}
}
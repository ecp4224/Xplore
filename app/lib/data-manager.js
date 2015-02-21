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
};

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
};

module.exports.getPosts = function( callback ) {
    var postRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/posts');
    if (postRef) {
        postRef.on('value', function (snapshot) {
            if (snapshot) {
                postRef.off('value');
                var posts = snapshot.val();
                callback( null, posts );
            } else {
                var err = new Error("Missing snapshot");
                callback( err, null );
            }
        });
    } else {
        var err = new Error("missing postRef");
        callback( err, null );
    }
}

module.exports.addPost = function(post, callback) {
    var postRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/posts');
    if (postRef) {
        postRef.on('value', function(snapshot) {
            if (snapshot) {
                postRef.off('value');
                var posts = snapshot.val();
                var postCountRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/post_count');
                postCountRef.on('value', function( postCountSnapshot ) {
                    postCountRef.off('value');
                    var postCount = parseInt( postCountSnapshot.val() );
                    post.id = postCount;
                    posts[postCount.toString()] = post;
                    postRef.set(posts, function( error ) {
                        if( error ) {
                            callback( error );
                        } else {
                            callback( null, post );
                        }
                    });
                    postCountRef.set(++postCount);
                });

            } else {
                var err = new Error("Missing snapshot");
                callback(err, null);
            }
        });
    } else {
        callback( null, null );
    }
};

module.exports.updatePost = function( postId, post ) {
    var postRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/posts/'+postId);
    if (postRef) {
        postRef.set(post);
    }
}

module.exports.addEventToUser = function(username, eventId, callback) {
    var userRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/users/'+username);
    if (userRef) {
        userRef.on('value', function(snapshot) {
            if (snapshot) {
                userRef.off('value');
                var user = snapshot.val();
                user.events.push(eventId);
                userRef.set(user, function (error) {
                    if (error) {
                        callback(error);
                    } else {
                        callback(null, user);
                    }
                });
            } else {
                var err = new Error("Missing snapshot");
                callback(err, null);
            }
        });
    } else {
        callback( null, null );
    }
};

module.exports.addUser = function(username, user, callback) {
    var usersRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/users');
    if (usersRef) {
        usersRef.on('value', function(usersSnapshot) {
            usersRef.off('value');
            if (usersSnapshot) {
                var users = usersSnapshot.val();
                var userCountRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/user_count');
                userCountRef.on('value', function( userCountSnapshot ) {
                    userCountRef.off('value');
                    var userCount = parseInt( userCountSnapshot.val() );
                    user.uid = userCount;
                    users[username] = user;
                    usersRef.set(users, function( error ) {
                        if( error ) {
                            callback( error );
                        } else {
                            callback( null, user );
                        }
                    });
                    userCountRef.set(++userCount);
                });

            } else {
                var err = new Error("Missing snapshot");
                callback(err, null);
            }
        });
    } else {
        callback( null, null );
    }
};

module.exports.getPostCount = function(callback) {
    var postRef = new Firebase('https://scorching-inferno-8193.firebaseio.com/post_count');
    if (postRef) {
        postRef.on('value', function(snapshot) {
            if (snapshot) {
                callback(null, snapshot.val());
            } else {
                callback(null, null);
            }
        });
    } else {
        callback(null, null);
    }
};

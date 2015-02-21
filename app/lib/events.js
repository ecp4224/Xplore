var database = require('./data-manager.js');

module.exports = {
    getFeedFor: function(type, username, callback, errorCallback) {
        if (type == "feed") {
            database.getPosts(function(e, data) {
                if (e) {
                    errorCallback(e);
                    return;
                }

                callback(data);
            });
        } else if (type == "home") {
            database.getUserWithUserName(username, function(e, user) {
                if (e) {
                    errorCallback(e);
                    return;
                }

                if (!user.events) {
                    callback([]);
                    return;
                }

                var toReturn = [];
                for (var i = 0; i < user.events.length; i++) {
                    var eventId = user.events[i];
                    console.log("Fetching event " + eventId);
                    database.getPostById(eventId, function(e, event) {
                        if (e) {
                            errorCallback(e);
                            return;
                        }

                        toReturn.push(event);

                        if (toReturn.length == user.events.length) {
                            callback(toReturn);
                        }
                    });
                }
            });
        }
    },
    createEvent: function(event, username, callback, errorCallback) {
        database.addPost(event, function(e, newPost) {
            if (e) {
                errorCallback(e);
                return;
            }

            console.log(newPost.id);

            database.addEventToUser(username, newPost.id, function(ee, user) {
                if (ee) {
                    errorCallback(ee);
                    return;
                }

                callback(newPost);
            });
        });
    },
    eventAction: function(postId, actionType, data, username, callback, errorCallback) {
        if (actionType == "rsvp") {
            var role = data.role;
            database.getPostById(postId, function(e, post) {
                if (e) {
                    errorCallback(e);
                    return;
                }
                for (var i = 0; i < post.tickets.length; i++) {
                    var r = post.tickets[i];
                    if (r.role == role && r.taken == 0) {
                        post.tickets[i].taken = 1;
                        break;
                    }
                }

                database.updatePost(postId, post);
                callback();
            });
        } else {
            errorCallback(new Error("Invalid action type"));
        }
    }
};
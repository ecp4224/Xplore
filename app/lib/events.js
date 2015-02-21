var database = require('./data-manager.js');

module.exports = {
    getFeedFor: function(type, username, callback, errorCallback) {
        if (type == "feed") {
            var toDisplay = 10;
            database.getPostCount(function(e, number) {
                if (e) {
                    errorCallback(e);
                    return;
                }

                var i = Math.max(number - toDisplay, 0); //Clamp i to 0
                var limit = toDisplay > number ? number : toDisplay;

                var toReturn = [];
                for (var t = number - 1; t >= i; t--) {
                    database.getPostById(t, function(e, event) {
                        if (e) {
                            errorCallback(e);
                            return;
                        }

                        toReturn.push(event);

                        if (toReturn.length == limit) {
                            callback(toReturn);
                        }
                    });
                }
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
    createAndSaveEvent: function(eventType, username) {
        //TODO Save event object to firebase database
    },
    feedAction: function(actionType, data, username) {
        //TODO Get feed, do action, and save to database
    }
};
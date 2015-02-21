var database = require('./data-manager.js');

module.exports = {
    getFeedFor: function(type, username, callback, errorCallback) {
        if (type == "feed") {
            
        } else if (type == "home") {
            database.getUserWithUserName(username, function(e, user) {
                if (e) throw e;

                if (!user.events) {
                    callback([]);
                    return;
                }

                var toReturn = [];
                for (var i = 0; i < user.events.length; i++) {
                    var eventId = user.events[i];
                    console.log("Fetching event " + eventId);
                    database.getPostById(eventId, function(e, event) {
                        if (e) throw e;

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
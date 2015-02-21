module.exports = {
    getFeedFor: function(type) {
        //TODO Get feeds for user from firebase database
        if (type == "feed") {

        } else if (type == "home") {

        }
    },
    createAndSaveEvent: function(eventType) {
        //TODO Save event object to firebase database
    },
    feedAction: function(actionType, data) {
        //TODO Get feed, do action, and save to database
    }
};
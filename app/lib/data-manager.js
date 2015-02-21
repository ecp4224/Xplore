module.exports.getUserWithUserName = function(username, callback) {
	var rabayaRef = myRootRef.child('/users/rabaya');
	rabayaRef.on('value', function(snapshot) {
		console.log()
	});
}
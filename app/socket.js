exports.AuthSuccess = function(data, accept) {
	console.log('successful connection to socket.io');
	accept();
};

exports.AuthFail = function(data, message, error, accept) {
	if (error) {
		throw new Error(message);
	}
	console.log('failed connection to socket.io:', message);
	// this error will be sent to the user as a special error-package
	// see: http://socket.io/docs/client-api/#socket > error-object
	if (error) {
		accept(new Error(message));
	}
};

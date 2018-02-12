const config = require( '../config' );

module.exports = function( req, res, next ){

	if( config.sso.bypass ){

		req.session.ssoToken = 'ssobypass';
	}

	next();
};
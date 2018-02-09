const homeController = require( './controllers/home' );
const ssoController = require( './controllers/sso' );

module.exports = function( express, app ){

	app.get( '/', homeController );
	app.get( '/login/', ssoController.authRedirect );
	app.get( '/login/callback/', ssoController.callback );
};
const uuid = require( 'uuid/v4' );
const request = require( 'request' );
const config = require( '../config' );
const logger = require( '../lib/logger' );

const urls = [ 'auth', 'token' ].reduce( ( params, param ) => {

	params[ param ] = `${ config.sso.protocol }://${ config.sso.domain}:${ config.sso.port }${ config.sso.path[ param ] }`;

	return params;
}, {} );

function stringify( params ){

	const arr = [];

	for( let paramKey in params ){

		arr.push( `${ paramKey }=${ encodeURIComponent( params[ paramKey ] ) }` );
	}

	return arr.join( '&' );
}

module.exports = {

	authRedirect: ( req, res ) => {

		const stateId = uuid();

		const urlParams = {
			response_type: 'code',
			client_id: config.sso.client,
			redirect_uri: config.sso.redirectUri,
			state: stateId,
			idp: 'cirrus'
		};

		if( config.sso.mockCode ){

			urlParams.code = config.sso.mockCode;
		}

		req.session.oauthStateId = stateId; // used to check the callback received contains matching state param
		return res.redirect( `${ urls.auth }?${ stringify( urlParams ) }` );
	},

	callback: ( req, res ) => {

		const errorParam = req.query.error;
		const stateParam = req.query.state;
		const codeParam = req.query.code;
		const stateId = req.session.oauthStateId;

		if( errorParam ){

			logger.error( `Error with SSO: ${ errorParam }`  );
			throw new Error( `Error with SSO: ${ errorParam }` );
		}

		if( stateParam !== stateId ){

			logger.error( 'StateId mismatch' );
			throw new Error( 'StateId mismatch' );
		}

		request( {
			method: 'POST',
			url: urls.token,
			formData: {
				code: codeParam,
				grant_type: 'authorization_code',
				client_id: config.sso.client,
				client_secret: config.sso.secret,
				redirect_uri: config.sso.redirectUri,
			},
			json: true,

		}, ( err, response, data ) => {

			if( err ){

				logger.error( 'Error with SSO token request' );
				logger.error( err );
				throw new Error( 'Error with token request' );
			}

			if( data.access_token ){

				req.session.ssoToken = data.access_token;
				delete req.session.oauthStateId;

				res.redirect( req.session.returnPath || '/' );

			} else {

				throw new Error( 'No access_token from SSO' );
			}
		} );
	}
};
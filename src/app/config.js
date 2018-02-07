const os = require( 'os' );

function env( name, defaultValue ){

	var exists = ( typeof process.env[ name ] !== 'undefined' );

	return ( exists ? process.env[ name ] : defaultValue );
}

function bool( name, defaultValue ){

	return ( env( name, defaultValue ) + '' ) === 'true';
}

function number( name, defaultValue ){

	return parseInt( env( name, defaultValue ), 10 );
}

const cpus = ( os.cpus().length || 1 );
const isDev = ( ( process.env.NODE_ENV || 'development' ) === 'development' );

let config = {
	isDev,
	showErrors: isDev,
	version: env( 'npm_package_version', 'unknown' ),
	server: {
		protocol: env( 'SERVER_PROTOCOL', 'http' ),
		host: env( 'SERVER_HOST', 'localhost' ),
		port: env( 'SERVER_PORT', env( 'PORT', 8080 ) ),
		cpus,
		workers: env( 'SERVER_WORKERS', env( 'WEB_CONCURRENCY', cpus ) )
	},
	views: {
		cache: bool( 'CACHE_VIEWS', true )
	},
	redis: {
		host: env( 'REDIS_HOST' ),
		port: number( 'REDIS_PORT' ),
		password: env( 'REDIS_PASSWORD' ),
		url: env( 'REDIS_URL' ) || env( 'REDISTOGO_URL' )
	},
	session: {
		ttl: ( 1000 * 60 * 60 * 2 ),//milliseconds for cookie
		secret: env( 'SESSION_SECRET', 'thisisadefaultsecretchangemenow' )
	},
	cookieSecret: env( 'COOKIE_SECRET' ),
	logLevel: env( 'LOG_LEVEL', 'warn' ),
	sentryDsn: env( 'SENTRY_DSN' ),
	analyticsId: env( 'ANALYTICS_ID' ),
	oauth: {
		paramLength: number( 'OAUTH_PARAM_LENGTH', 75 )
	},
	backend: {
		protocol: env( 'BACKEND_PROTOCOL', 'http' ),
		host: env( 'BACKEND_HOST', 'localhost' ),
		port: env( 'BACKEND_PORT', 8000 )
	},
	datahubDomain: env( 'DATA_HUB_DOMAIN', 'https://www.datahub.trade.gov.uk' ),
};

config.backend.href = `${config.backend.protocol}://${config.backend.host}:${config.backend.port}`;

module.exports = config;

const config = require( '../config' );
const backendService = require( '../lib/backend-service' );
const getCacheTime = require( '../lib/get-cache-time' );

module.exports = {
	index: function( req, res ){
    // const offset = req.query.offset;
    // const limit = req.query.limit;
    // const data = backendService.searchForCompanies( offset, limit, postData );
    // console.log('pisica ', data);
    res.render( 'acs/index' );
	},

	search: async function( req, res ){
		const offset = req.query.offset;
		const limit = req.query.limit;
		const postData = req.body;
		const data = await backendService.searchForCompanies( offset, limit, postData );

		res.json( data.body );
	},

	internalCompanyIdEvents: async function( req, res ){
		const data = await backendService.getEventsByInternalCompanyId( req.params.id );

		res.json( data.body );
	},

	searchBySicCode: async function( req, res ){
		const data = await backendService.searchBySicCode( req.params.code );

		res.json( data.body );
	},

	searchByExportCode: async function( req, res ){
		const data = await backendService.searchByExportCode( req.params.code );

		res.json( data.body );
	},

	dataByType: async function( req, res ){
		const data = await backendService.getDataByType( req.params.type );

		if( !config.isDev ){
			const cacheTime = getCacheTime();
			
			res.setHeader( 'Cache-Control', 'public, max-age=' + cacheTime.seconds );
			res.setHeader( 'Expires', cacheTime.utc );
		}

		res.json( data.body );
	}
};

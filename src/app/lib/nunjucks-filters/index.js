module.exports = function( env ){
	env.addFilter( 'dateOnly', require( './date-only' ) );
	env.addFilter( 'isArray', require( 'lodash' ) );
};

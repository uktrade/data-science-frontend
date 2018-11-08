
const forceHttps = require( '../../../../app/middleware/force-https' );

const forwardHeader = 'x-forwarded-proto';

describe( 'force-https middleware', () => {

	let req;
	let res;
	let next;
	let redirect;
	let get;
	let url;

	beforeEach(() => {

		redirect = jasmine.createSpy( 'res.redirect' );
		get = jasmine.createSpy( 'req.get' ).and.callFake( () => 'test.com' );
		url = '/test/';
		next = jasmine.createSpy( 'next' );

		req = {
			headers: {},
			url,
			get
		};

		res = {
			redirect
		};
	});

	describe( 'In dev mode', () => {

		test('Should call next', () => {

			const middleware = forceHttps( true );
			middleware( req, res, next );

			expect( next ).toHaveBeenCalled();
		});
	} );

	describe( 'Not in dev mode', () => {

		describe( 'When the header is defined', () => {

			describe( 'When the header is http', () => {

				test('Should redirect to https', () => {

					const middleware = forceHttps( false );
					req.headers[ forwardHeader ] = 'http';
					middleware( req, res, next );
					expect( res.redirect ).toHaveBeenCalledWith( 'https://test.com/test/' );
				});
			} );

			describe( 'When the header is https', () => {

				test('Should call next', () => {

					const middleware = forceHttps( false );
					req.headers[ forwardHeader ] = 'https';
					middleware( req, res, next );
					expect( next ).toHaveBeenCalled();
				});
			} );
		} );

		describe( 'When the header is not defined', () => {

			test('Should call next', () => {

				const middleware = forceHttps( false );
				middleware( req, res, next );
				expect( next ).toHaveBeenCalled();
			});
		} );
	} );
} );

const supertest = require( 'supertest' );
const winston = require( 'winston' );

const logger = require('../../../app/lib/logger');
const app = require('../../../app/app');
const config = require('../../../../config');

jest.mock('../../../app/middleware/sso-bypass', () => { return (req, res, next) => next() });
jest.mock('../../../app/lib/redis-client');
jest.mock('readdirp');
jest.mock('chokidar');
jest.mock('nunjucks');
jest.mock('../../../app/lib/static-globals');
jest.mock('../../../app/lib/nunjucks-filters');


function getTitle(res){
	const text = res.text;
	const openTag = '<title>';
	const openTagIndex = text.indexOf(openTag);
	const closeTagIndex = text.indexOf('</title>', openTagIndex);
	const title = text.substring((openTagIndex + openTag.length), closeTagIndex);

	return title;
};

function checkResponse(res, statusCode){
	const headers = res.headers;
	expect(res.statusCode).toEqual(statusCode);
	expect(headers['x-download-options']).toBeDefined();
	expect(headers['x-xss-protection']).toBeDefined();
	expect(headers['x-content-type-options']).toBeDefined();
	expect(headers['x-frame-options']).toBeDefined();
	expect(headers['cache-control']).toEqual('no-cache, no-store');
};

describe( 'App', () => {
	let oldTimeout;

	beforeEach( () => {
		logger.remove(winston.transports.Console);
		oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
	});

	afterEach(() => {
		logger.add(winston.transports.Console);
		jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
	});

	describe('With SSO bypass enabled', () => {
		let testApp;

		beforeEach(() => {
			testApp = app.create(undefined, config);
			config.isDev = true;
			config.sso = { bypass: true };
		});

		afterEach(() => {
			jest.restoreAllMocks();
			jest.resetModules();
		});

		describe('index page', () => {
			it('Should render the index page', (done) => {
				supertest(testApp).get('/').end((err, res) => {
					checkResponse(res, 200);
					expect(getTitle(res)).toEqual('DS - Find Exporters');
				});
				done();
			});
		});

		describe('Ping', () => {
			it('Should return a status of 200', function(done){
				supertest(testApp).get('/ping/').end((err, res) => {
					checkResponse(res, 200);
				});
				done();
			});
		});
	});

	describe('With SSO bypass disabled', () => {
		let testApp;
		beforeEach( function(){
			testApp = app.create(undefined, config);
		});

		describe( 'Pages requiring auth', function(){
			const pages = [
				['/', 'Index']
			];
			for(let [path, page] of pages){
				it( `Should redirect the ${ page } page to the login page`, (done) => {
					supertest(testApp).get(path).end((err, res) => {
						checkResponse(res, 302);
						expect(res.headers.location).toEqual('/login/');
					});
					done();
				});
			}
		});

		describe('Pages not requiring auth', () => {
			const pages = [
				['/ping/', 'Healthcheck']
			];
			for(let [ path, page ] of pages ){
				it(`Should render the ${ page } page`, (done) => {
					supertest(testApp).get(path).end((err, res) => {
						checkResponse(res, 200);
					});
					done();
				});
			}
		});
	});
});

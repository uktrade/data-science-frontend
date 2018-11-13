jest.mock('.../../../../config', () => ({ analyticsId: 'abc123', datahubDomain: 'https://some-domain.com' }));

describe('Static globals', () => {
	const analyticsId = 'abc123';
	const datahubDomain = 'https://some-domain.com';

	let calls;
	let staticGlobals;

	beforeEach(() => {
		staticGlobals = require( '../../../../app/lib/static-globals');
		const env = {
			addGlobal: jest.fn()
		};

		staticGlobals(env);
		calls = env.addGlobal.mock.calls;
	});

	it('Should add the analyticsId to the nunjucks env', () => {
		const args = calls[0];

		expect(args[0]).toEqual('analyticsId');
		expect(args[1]).toEqual(analyticsId);
	});

	it('Should add the feedbackLink to the nunjucks env', () => {
		const args = calls[1];

		expect(args[0]).toEqual('feedbackLink');
		expect(args[1]).toEqual(`${ datahubDomain }/support`);
	});

	it('Should add the headerLink to the nunjucks env', () => {
		const args = calls[2];

		expect(args[0]).toEqual('headerLink');
		expect(args[1]).toEqual(`${ datahubDomain }/`);
	});

	it('Should add the profileLink to the nunjucks env', () => {
		const args = calls[3];

		expect(args[0]).toEqual('profileLink');
		expect(args[1]).toEqual(`${ datahubDomain }/profile`);
	});
});

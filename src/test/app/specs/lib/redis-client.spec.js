jest.mock('redis', () => ({
	createClient: jest.fn((arg) => ({ 
		arg,
		on: jest.fn()
	}))
}));

jest.mock('../../../../../config', () => ({
	redis: { url: 'redis://redistogo:44e', port: '4444'}
}));

describe('Redis Client', () => {
	let redis;

	beforeEach(() => {
		jest.restoreAllMocks();
		jest.resetModules();
		redis = require('redis');
	});

	it('Should listen for the events', () => {
		const client = require('../../../../app/lib/redis-client').get();
		const calls = client.on.mock.calls;

		expect(calls.length).toEqual(4);

		expect(calls[0][0]).toEqual('error');
		expect(calls[1][0]).toEqual('connect');
		expect(calls[2][0]).toEqual('ready');
		expect(calls[3][0]).toEqual('close');
	});

	it('Should return the client', function(){
		const client = require('../../../../app/lib/redis-client').get();
		const redisClient = redis.createClient({ url: 'redis://redistogo:44e', port: '4444'});
		expect(client.arg.url).toEqual(redisClient.arg.url);
		expect(client.arg.port).toEqual(redisClient.arg.port);
		expect(client.on()).toEqual(redisClient.on());
	});

	it('Should pass redis config as an option', () => {
		require('../../../../app/lib/redis-client').get();

		expect(redis.createClient).toHaveBeenCalledWith({ url: 'redis://redistogo:44e', port: '4444'});
	});

	it('Should set redis tls as an option if not undefined', () => {
		jest.doMock('../../../../../config', () => ({
			redis: { url: 'redis://redistogo:44e', port: '4444', tls: true}
		}));
		require('../../../../app/lib/redis-client').get();

		expect(redis.createClient).toHaveBeenCalledWith({ url: 'redis://redistogo:44e', port: '4444', tls: { rejectUnauthorized: true } });
	});
});
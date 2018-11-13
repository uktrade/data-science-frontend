const app = require('../../../app/app');
const config = require('../../../../config');

jest.mock('../../../app/lib/redis-client');
jest.mock('morgan');
jest.mock('compression');

const disable = jest.fn();
const dummyApp = {
  disable,
  use: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  address: jest.fn(),
  listen: jest.fn(),
};

jest.mock('express', () => {
  return {
    static: jest.fn(),
    disable: jest.fn(),
    use: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
  };
});

describe('App', () => {
  describe('Environments', () => {
    const morgan = require('morgan');
    const compression = require('compression');

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
    });

    describe('Dev mode', () => {
      it('Should setup the app in dev mode', () => {
        config.isDev = true;
        app.create(dummyApp, config);
        expect(morgan).toHaveBeenCalledWith('dev');
        expect(compression).not.toHaveBeenCalled();
        expect(disable).toHaveBeenCalledWith('x-powered-by');
      });
    });

    describe('Prod mode', () => {
      it('Should setup the app in prod mode', () => {
        config.isDev = false;
        app.create(dummyApp, config);
        expect(morgan).toHaveBeenCalledWith('combined');
        expect(compression).toHaveBeenCalled();
        expect(disable).toHaveBeenCalledWith('x-powered-by');
      });
    });
  });
});

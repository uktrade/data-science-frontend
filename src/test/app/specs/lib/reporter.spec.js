jest.mock('raven', () => {
  let install = jest.fn();
  return {
    captureMessage: jest.fn(),
    config: jest.fn(() => { return { install }; }),
    install,
    requestHandler: jest.fn(),
    errorHandler: jest.fn(),
    captureException: jest.fn(),
  };
});

jest.mock('../../../../app/lib/logger', () => ({
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));

jest.mock('.../../../../config', () => ({ sentryDsn: 'test1234', version: 'v1.0.0' }));

describe('Error reporter', () => {
  let reporter;
  let logger;
  let raven;

  beforeEach(() => {
    raven = require('raven');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  describe('When a Sentry DSN is configured', () => {
    beforeEach(() => {
      reporter = require('../../../../app/lib/reporter');
      logger = require('../../../../app/lib/logger');
    });

    describe('On load of module', () => {
      it('Should setup and install raven', () => {
        expect(raven.config).toHaveBeenCalledWith('test1234', { release: 'v1.0.0' });
        expect(raven.install).toHaveBeenCalled();
      });
    });

    describe('Setup', () => {
      it('Should invoke the responseHandler', () => {
        const appStub = {
          use: jest.fn(),
        };
        reporter.setup(appStub);

        expect(appStub.use).toHaveBeenCalled();
        expect(raven.requestHandler).toHaveBeenCalled();
      });
    });

    describe('handleErrors', () => {
      it('Should invoke the errorHandler', () => {
        const appStub = {
          use: jest.fn(),
        };
        reporter.handleErrors(appStub);

        expect(appStub.use).toHaveBeenCalled();
        expect(raven.errorHandler).toHaveBeenCalled();
      });
    });

    describe('A message', () => {
      it('Should send the message to sentry', () => {
        const msg = 'Test';
        const level = 'test';
        const extra = {
          blah: 'test',
          foo: 'test',
        };
        reporter.message(level, msg, extra);

        expect(raven.captureMessage).toHaveBeenCalledWith(msg, { level, extra });
      });
    });

    describe('captureException', () => {
      it('captureException should raise an exception', () => {
        const err = new Error('test exception');
        reporter.captureException(err);

        expect(raven.captureException).toHaveBeenCalledWith(err);
      });
    });
  });

  describe('When a DSN is not configured', () => {
    beforeEach(() => {
      jest.doMock('.../../../../config', () => ({ version: 'v1.0.0' }));
      reporter = require('../../../../app/lib/reporter');
      logger = require('../../../../app/lib/logger');
    });

    describe('On load of the module', () => {
      it('Should not setup or install raven', () => {
        expect(raven.config).not.toHaveBeenCalled();
        expect(raven.install).not.toHaveBeenCalled();
      });
    });

    describe('Setup', () => {
      it('Should not invoke the responseHandler', () => {
        const appStub = {
          use: jest.fn(),
        };
        reporter.setup(appStub);

        expect(appStub.use).not.toHaveBeenCalled();
        expect(raven.requestHandler).not.toHaveBeenCalled();
      });
    });

    describe('handleErrors', () => {
      it('Should not invoke the errorHandler', () => {
        const appStub = {
          use: jest.fn(),
        };
        reporter.handleErrors(appStub);

        expect(appStub.use).not.toHaveBeenCalled();
        expect(raven.errorHandler).not.toHaveBeenCalled();
      });
    });

    describe('A message', () => {
      it('Should log the error to the logger', () => {
        const msg = 'Test logger';
        const level = 'test';
        const extra = {
          blah: 'test',
          foo: 'test',
        };
        reporter.message(level, msg, extra);

        expect(raven.captureMessage).not.toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledWith(msg, JSON.stringify(extra));
      });
    });

    describe('captureException', () => {
      it('Should log the error with the logger', () => {
        const err = new Error('Test exception');
        reporter.captureException(err);

        expect(logger.error).toHaveBeenCalledWith(err);
        expect(raven.captureException).not.toHaveBeenCalled();
      });
    });
  });
});

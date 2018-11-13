jest.mock('../../../../../config', () => { return { showErrors: false }; });
jest.mock('../../../../app/lib/logger', () => { return { error: jest.fn() }; });
const logger = require('../../../../app/lib/logger');

describe('errors middleware', () => {
  let err;
  let req;
  let res;
  let next;
  let middleware;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(),
      render: jest.fn(),
      sendStatus: jest.fn(),
    };
    next = jest.fn();
    middleware = require('../../../../app/middleware/errors');
  });

  describe('Errors middleware', () => {
    describe('catchAll', () => {
      beforeEach(() => {
        err = new Error('test');
      });

      describe('When the headers have been sent', () => {
        test('Should call the next handler with the error', () => {
          res.headersSent = true;

          middleware.catchAll(err, req, res, next);

          expect(res.status).not.toHaveBeenCalled();
          expect(res.render).not.toHaveBeenCalled();
          expect(logger.error).toHaveBeenCalled();
          expect(next).toHaveBeenCalledWith(err);
        });
      });

      describe('When the headers have not been sent', () => {
        describe('A generic error', () => {
          it('Should log the error and send a response with the right status code', () => {
            middleware.catchAll(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.render).toHaveBeenCalledWith('error/default', { showErrors: false, error: err });
            expect(logger.error).toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
          });
        });

        describe('A TOO_MANY_BYTES error', () => {
          it('Should return a 413 status', () => {
            const tooManyBytesError = new Error('Too many bytes');
            tooManyBytesError.code = 'TOO_MANY_BYTES';

            middleware.catchAll(tooManyBytesError, req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(413);
            expect(logger.error).toHaveBeenCalled();
          });
        });
      });
    });

    describe('404', () => {
      it('Should render the 404 page and send the right status code', () => {
        middleware.handle404(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.render).toHaveBeenCalledWith('error/404');
        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});

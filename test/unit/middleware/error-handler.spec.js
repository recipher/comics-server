const assert = require('assert');
const td = require('testdouble');

const URL = '/comics';
const DT = '2017-01-01T00:00:00';

const CustomError = function(message, statusCode) {
  Error.call(this);

  this.statusCode = statusCode;
  this.message = message;
};

describe('middleware/error-handler', () => {
  beforeEach(() => {
    this.next = td.function();
    this.ctx = {
      response: {},
      request: { url: URL }
    };

    this.format = td.replace('date-fns/format');

    td.when(this.format(td.matchers.isA(Date), td.matchers.isA(String))).thenReturn(DT);

    this.log = td.replace('../../../src/logger');
    this.log.error = td.function();

    td.when(this.log.error(td.matchers.anything()));
  });

  describe('when next is successful', () => {
    beforeEach(() => {
      td.when(this.next()).thenResolve('result');
      this.sut = require('../../../src/middleware/error-handler');
    });

    it('should not return 500 status code', () => {
      return this.sut(this.ctx, this.next).then(() => {
        assert.notEqual(this.ctx.response.status, 500);
      });
    });
  });

  describe('when next is unsuccessful', () => {
    beforeEach(() => {
      td.when(this.next()).thenReject(new Error());
      this.sut = require('../../../src/middleware/error-handler');
    });

    it('should return 500 status code', () => {
      return this.sut(this.ctx, this.next).then(() => {
        assert.equal(this.ctx.response.status, 500);
      });
    });
  });

  describe('when next is unsuccessful with custom error', () => {
    beforeEach(() => {
      td.when(this.next()).thenReject(new CustomError('Failed', 400));
      this.sut = require('../../../src/middleware/error-handler');
    });

    it('should return 400 status code', () => {
      return this.sut(this.ctx, this.next).then(() => {
        assert.equal(this.ctx.response.status, 400);
      });
    });

    it('should return body with message and status', () => {
      return this.sut(this.ctx, this.next).then(() => {
        assert.deepEqual(this.ctx.body, {
          message: 'Failed',
          statusCode: 400
        });
      });
    });

    it('should call logger error with correct information', () => {
      return this.sut(this.ctx, this.next).then(() => {
        td.verify(
          this.log.error({
            statusCode: 400,
            timestamp: DT,
            message: 'Failed',
            url: URL
          })
        );
      });
    });
  });
});

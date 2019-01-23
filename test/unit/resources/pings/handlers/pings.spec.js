const assert = require('assert');
const td = require('testdouble');

const PING = { ping: true };

describe('GET /pings handler', () => {
  const execute = async ctx => {
    const sut = require('../../../../../src/resources/pings/handlers').pings.get;

    return sut(ctx);
  };

  afterEach(td.reset);

  describe('when called', () => {
    beforeEach(async () => {
      this.ctx = {};
      await execute(this.ctx);
    });

    it('should set body correctly', () => {
      assert.deepEqual(this.ctx.body, PING);
    });
  });
});

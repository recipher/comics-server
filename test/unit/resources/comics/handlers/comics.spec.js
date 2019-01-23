const assert = require('assert');
const td = require('testdouble');

const COMICS = [ { id: 1234 } ];

describe('GET /comics handler', () => {
  const execute = async ctx => {
    const list = td.function();

    const finder = td.replace('../../../../../src/resources/comics/services/finder');

    td.when(finder(ctx)).thenReturn({ list });

    td.when(list(ctx.request.query)).thenReturn(COMICS);

    const sut = require('../../../../../src/resources/comics/handlers').comics.get;

    return sut(ctx);
  };

  afterEach(td.reset);

  describe('when called', () => {
    beforeEach(async () => {
      this.ctx = {
        request: {
          query: { }
        }
      };
      await execute(this.ctx);
    });

    it('should set body correctly', () => {
      assert.deepEqual(this.ctx.body, { comics: COMICS });
    });
  });
});

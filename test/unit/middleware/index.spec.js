const td = require('testdouble');

describe('middleware/index', () => {
  beforeEach(() => {
    this.cors = td.replace('@koa/cors');
    this.errorHandler = td.replace('../../../src/middleware/error-handler');
    this.logResponse = td.replace('../../../src/middleware/log-response');
    this.app = td.object({ use: () => {} });

    const sut = require('../../../src/middleware');
    sut.setup(this.app);
  });

  afterEach(td.reset);

  describe('when setup', () => {
    it('should set up cors middleware', () => {
      td.verify(this.app.use(this.cors()));
    });

    it('should set up error handling middleware', () => {
      td.verify(this.app.use(this.errorHandler));
    });

    it('should set up log response middleware', () => {
      td.verify(this.app.use(this.logResponse));
    });
  });
});

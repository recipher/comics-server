const td = require('testdouble');

describe('comics routes', () => {
  beforeEach(() => {
    this.use = td.function();

    this.handlers = {
      comics: { get: td.function() }
    };

    this.Router = td.constructor(['get', 'routes', 'allowedMethods']);

    td.replace('koa-router', this.Router);
    td.replace('../../../../src/config', { handlers: 'handlers' });
    td.replace(
      '../../../../src/resources/comics/handlers',
      this.handlers
    );

    this.sut = require('../../../../src/resources/comics/routes');
    this.sut.setup({ use: this.use });
  });

  afterEach(td.reset);

  it('should setup comics route', () => {
    td.verify(
      this.Router.prototype.get('/comics', this.handlers.comics.get)
    );
  });

  it('should use defined routes', () => {
    td.verify(this.use(this.Router.prototype.routes()));
  });

  it('should use allowed methods', () => {
    td.verify(this.use(this.Router.prototype.allowedMethods()));
  });
});

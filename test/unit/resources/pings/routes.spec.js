const td = require('testdouble');

describe('pings routes', () => {
  beforeEach(() => {
    this.use = td.function();

    this.handlers = {
      pings: { get: td.function() }
    };

    this.Router = td.constructor(['get', 'routes', 'allowedMethods']);

    td.replace('koa-router', this.Router);
    td.replace('../../../../src/config', { handlers: 'handlers' });
    td.replace(
      '../../../../src/resources/pings/handlers',
      this.handlers
    );

    this.sut = require('../../../../src/resources/pings/routes');
    this.sut.setup({ use: this.use });
  });

  afterEach(td.reset);

  it('should setup pings route', () => {
    td.verify(
      this.Router.prototype.get('/pings', this.handlers.pings.get)
    );
  });

  it('should use defined routes', () => {
    td.verify(this.use(this.Router.prototype.routes()));
  });

  it('should use allowed methods', () => {
    td.verify(this.use(this.Router.prototype.allowedMethods()));
  });
});

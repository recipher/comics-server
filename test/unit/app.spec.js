const td = require('testdouble');

describe('app', () => {
  beforeEach(() => {
    this.Koa = td.replace('koa');

    this.middleware = td.replace('../../src/middleware');
    this.comics = td.replace('../../src/resources/comics/routes');
    this.characters = td.replace('../../src/resources/characters/routes');
    this.pings = td.replace('../../src/resources/pings/routes');
    
    const sut = require('../../src/app');

    sut();
  });

  afterEach(td.reset);

  it('should set up middleware', () => {
    td.verify(this.middleware.setup(td.matchers.isA(this.Koa)));
  });

  it('should set up comics', () => {
    td.verify(this.comics.setup(td.matchers.isA(this.Koa)));
  });

  it('should set up pings', () => {
    td.verify(this.pings.setup(td.matchers.isA(this.Koa)));
  });
});

const td = require('testdouble');
const sut = require('../../src/logger');

describe('logger', () => {
  it('should info', () => {
    sut.info('info');
  });

  it('should warn', () => {
    sut.warn('warn');
  });

  it('should error', () => {
    sut.error('error');
  });

  it('should debug', () => {
    sut.debug('debug');
  });

  describe('when using default logging level', () => {
    beforeEach(() => {
      td.replace('../../src/config', { logging: { level: null } });

      this.sut = require('../../src/logger');
    });

    afterEach(td.reset);

    it('should info', () => {
      sut.info('info');
    });

    it('should warn', () => {
      sut.warn('warn');
    });

    it('should error', () => {
      sut.error('error');
    });

    it('should debug', () => {
      sut.debug('debug');
    });
  });
});

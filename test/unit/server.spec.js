const td = require('testdouble');

const PORT = 3000;

describe('server', () => {
  beforeEach(() => {
    this.http = td.replace('http');
    this.logger = td.replace('../../src/logger');
    this.config = td.replace('../../src/config', { port: PORT });

    this.listen = td.function();
    this.app = td.function();
    this.appCallback = td.function();

    td.when(this.app()).thenReturn({ callback: this.appCallback });

    td.replace('../../src/app', this.app);

    td
      .when(this.http.createServer(this.appCallback()))
      .thenReturn({ listen: this.listen });
  });

  afterEach(td.reset);

  describe('when successful', () => {
    beforeEach(() => {
      td.when(this.listen(td.matchers.anything())).thenCallback();

      this.sut = require('../../src/server');
    });

    it('should call listen', () => {
      td.verify(
        this.listen(PORT, td.matchers.isA(Function))
      );
    });

    it('should log info', () => {
      td.verify(this.logger.info(td.matchers.isA(String)));
    });

    describe('when an error occurs', () => {
      beforeEach(() => {
        td
          .when(this.listen(this.config.port))
          .thenCallback('error');

        this.sut = require('../../src/server');
      });

      it('should log error', () => {
        td.verify(
          this.logger.error(
            td.matchers.isA(String),
            'error'
          )
        );
      });
    });
  });
});

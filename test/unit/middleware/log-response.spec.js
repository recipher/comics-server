const td = require('testdouble');

const URL = '/comics';

describe('middleware/log-response', () => {
  beforeEach(() => {
    this.getTime = td.replace('date-fns/get_time');
    this.next = td.function();

    td.when(this.getTime(td.matchers.isA(Date))).thenReturn(0);

    this.log = td.replace('../../../src/logger');

    td.when(this.log.info({            elapsed: 0,
      url: URL }));

    this.ctx = { request: { url: URL }};

    this.sut = require('../../../src/middleware/log-response');
  });

  describe('when next is called', () => {
    beforeEach(() => {
      td.when(this.next()).thenResolve('result');
    });

    it('should log the information correctly', () => {
      return this.sut(this.ctx, this.next).then(() => {
        td.verify(
          this.log.info({
            elapsed: 0,
            url: URL,
          })
        );
      });
    });
  });
});

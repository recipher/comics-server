const assert = require('assert');
const sut = require('../../src/config');

describe('config', () => {
  it('should return test config', () => {
    assert.equal(sut.node_env, 'test');
  });
});

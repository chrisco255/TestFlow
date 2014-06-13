'use strict';

describe('Service: Tree', function () {

  // load the service's module
  beforeEach(module('testFlowApp'));

  // instantiate service
  var Tree;
  beforeEach(inject(function (_Tree_) {
    Tree = _Tree_;
  }));

  it('should do something', function () {
    expect(!!Tree).toBe(true);
  });

});

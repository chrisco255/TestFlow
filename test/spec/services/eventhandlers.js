'use strict';

describe('Service: EventHandlers', function () {

  // load the service's module
  beforeEach(module('testFlowApp'));

  // instantiate service
  var EventHandlers;
  beforeEach(inject(function (_EventHandlers_) {
    EventHandlers = _EventHandlers_;
  }));

  it('should do something', function () {
    expect(!!EventHandlers).toBe(true);
  });

});

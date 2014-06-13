'use strict';

describe('Service: Tree', function () {

  // load the service's module
  beforeEach(module('testFlowApp'));

  // instantiate service
  var Tree;
  beforeEach(inject(function (_Tree_) {
    Tree = _Tree_;
  }));

  describe('Node', function() {
    it('should have an empty string for default construction', function() {
      var node = Tree.Node();
      expect(node.content).toEqual('');
    });

    it('should set a content string on construction', function() {
      var node = Tree.Node('test');
      expect(node.content).toEqual('test');
    });

    it('should have an empty children array by default', function() {
      var node = Tree.Node();
      expect(node.children).toBeDefined();
    });

  });

  describe('root', function() {
    it('should be a Node', function () {
      expect(Tree.root).toBeDefined();
      expect(Tree.root.children).toBeDefined();
      expect(Tree.root.content).toBeDefined();
    });
  });

});

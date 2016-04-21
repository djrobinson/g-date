(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Member Convo</h2>'
    }
    return directive;
  }
})();
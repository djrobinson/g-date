(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersAll', membersAll)

  function membersAll(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Members All</h2>'
    }
    return directive;
  }
})();
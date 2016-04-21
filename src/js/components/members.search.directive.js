(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersSearch', membersSearch)

  function membersSearch(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Members Search</h2>'
    }
    return directive;
  }
})();
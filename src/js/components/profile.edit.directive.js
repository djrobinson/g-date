(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profileEdit', profileEdit)

  function profileEdit(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Profile Edit</h2>'
    }
    return directive;
  }
})();
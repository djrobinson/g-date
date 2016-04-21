(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberInfo', memberInfo)

  function memberInfo(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Member Info</h2>'
    }
    return directive;
  }
})();
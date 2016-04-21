(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('register', register)

  function register(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Register</h2>'
    }
    return directive;
  }
})();
(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('login', login)

  function login(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Login</h2>'
    }
    return directive;
  }
})();
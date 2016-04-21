(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('home', home)

  function home(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Home</h2>'
    }
    return directive;
  }
})();
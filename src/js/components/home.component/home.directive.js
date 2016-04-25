(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('home', home)

  function home(){
    var directive = {
      restrict: 'EA',
      template: `
                  <div class="jumbotron">
                    <h1>Home</h2>
                  </div>
                `
    }
    return directive;
  }
})();
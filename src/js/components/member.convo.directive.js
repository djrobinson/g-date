(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      scope: {
        item: '='
      },
      template: `<h2>Member Convo</h2>
                  <input type="text" ng-model="item" />
                `
    }
    return directive;
  }
})();
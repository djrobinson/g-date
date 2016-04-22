(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberInfo', memberInfo)

  function memberInfo(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <h2>Member Info</h2>
                  <h1>{{vm.selected.username}}</h1>
                  <h3>{{vm.selected.names.firstName}} {{vm.selected.names.lastName}}</h3>
                  <h3>{{vm.selected.email}}</h3>
                  <p>{{vm.selected.description}}</p>
                  <img src="{{vm.selected.avatar}}" alt="avatar" />
                `
    }
    return directive;
  }
})();
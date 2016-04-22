  (function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberInfo', memberInfo)
    .controller('infoCtrl', infoCtrl)

    infoCtrl.$inject = ['matchService', '$localStorage', '$scope'];

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
                  <button ng-click="vmInfo.createMatch(vm.selected._id)">Match w/ this person</button>
                `,
      controller: 'infoCtrl',
      controllerAs: 'vmInfo'
    }
    return directive;
  }

  function infoCtrl(matchService, $localStorage, $scope){
    var vmInfo = this;

    var member_id = $localStorage.user;
    // var _match = $scope.vm.selected._id;
    vmInfo.createMatch = function(match){
      console.log("Matching!");
      var _match = {
        _match: match
      }
      matchService.createMatch(member_id, _match)
        .then(function(data){
          console.log(data);
        })
    }
  }
})();
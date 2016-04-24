  (function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberInfo', memberInfo)
    .controller('infoCtrl', infoCtrl)

    infoCtrl.$inject = ['$localStorage', '$scope', 'matchService'];

  function memberInfo(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <div ng-show="vm.selected" class="row">
                    <br>
                    <br>
                    <br>

                    <div class="panel panel-primary">
                      <div class="panel-heading">
                        <h2 class="panel-title">Member Info</h2>
                      </div>
                      <div class="panel-body">
                        <div class="col-md-3">
                          <img src="{{vm.selected.avatar}}" alt="avatar" />
                          <br>
                          <br>
                          <button ng-click="vmInfo.createMatch(vm.selected._id)" class="btn btn-primary">Match w/ this person</button>
                        </div>
                        <div class="col-md-9">
                          <h1>{{vm.selected.username}}</h1>
                          <h3>{{vm.selected.names.firstName}} {{vm.selected.names.lastName}}</h3>
                          <h3>{{vm.selected.email}}</h3>
                          <p>{{vm.selected.description}}</p>
                          <p>{{vm.selected.distance}}</p>


                        </div>
                      </div>
                    </div>
                  </div>
                `,
      controller: 'infoCtrl',
      controllerAs: 'vmInfo'
    }
    return directive;
  }

  function infoCtrl($localStorage, $scope, matchService){
    var vmInfo = this;


    var member_id = $localStorage.user;
    vmInfo.createMatch = function(match){
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
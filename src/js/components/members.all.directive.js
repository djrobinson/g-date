(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersAll', membersAll)
    .controller('membersCtrl', membersCtrl)

    membersCtrl.$inject = ['$scope','memberService', 'matchService', '$localStorage'];

  function membersAll(){
    var directive = {
      restrict: 'EA',
      template: `
                    <div class="col-md-4 sidebar">
                      <h2>Members All</h2>
                      <a ui-sref="members.search">Search</a>
                      <a class="btn btn-default" ng-click="vm.getMatches()">Matches</a>
                      <div ng-repeat="member in vm.members">
                        <member-icon
                          id="member._id"
                          slug="member.slug"
                          avatar="member.avatar"
                          username="member.username"
                          first="member.names.firstName"
                          last="member.names.lastName"
                          set="vm.setSelected(id)">
                        </member-icon>
                      </div>
                      <button class="btn btn-default" ng-click="vm.iterate()">Next 10</button>
                    </div>
                    <div class="col-md-8 main col-md-offset-4" ui-view>

                    </div>
                `,
      controller: 'membersCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function membersCtrl($scope, memberService, matchService, $localStorage){
    var vm = this;

    vm.setSelected = function(id){
      if ( id ){
        memberService.getMember(id).then(function(data){
          vm.selected = data;
        })

      }
    };

    var iterator = 0;
    vm.iterate = function(){
      iterator++;
      getPage();
    }
    vm.test = "hello";
    function getPage(){
      memberService.getMembers(iterator)
        .then(function(data){
          vm.members = data;
          return vm.members;
        });
      }
    getPage();

    vm.testing = "bliggity blah";
    vm.memberSearch = function(newMembers){
      vm.members = newMembers;
      return vm.members;
    }

    vm.getMatches = function(){
      var member_id = $localStorage.user;
      matchService.getMatches(member_id)
        .then(function(data){
          console.log(data);
          vm.members = data;
          return vm.members;
        })

    }
  }
})();
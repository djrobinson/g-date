(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersAll', membersAll)
    .controller('membersCtrl', membersCtrl)

  function membersAll(){
    var directive = {
      restrict: 'EA',
      template: `
                    <div class="col-md-4 sidebar">
                      <h2>Members All</h2>
                      <a ui-sref="members.search">Search</a>
                      <a ui-sref="members.member">Member</a>
                      <input type="text" ng-model="vm.shared">
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

  function membersCtrl($scope, memberService){
    var vm = this;

    vm.setSelected = function(id){
      console.log(id);
      if ( id ){
        console.log("Set Selected Running!");
        memberService.getMember(id).then(function(data){
          vm.selected = data;
        })
      }
    };

    var iterator = 0;
    vm.iterate = function(){
      iterator++;
      console.log(iterator);
      getPage();
    }
    vm.test = "hello";
    function getPage(){
      memberService.getMembers(iterator)
        .then(function(data){
          console.log(data);
          vm.members = data;
          return vm.members;
        });
      }

    getPage();
  }
})();
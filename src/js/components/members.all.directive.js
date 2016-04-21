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
                    </div>
                    <div class="col-md-8 main col-md-offset-4" ui-view></div>
                `,
      controller: 'membersCtrl',
      controllerAs: 'vm'

    }
    return directive;
  }

  function membersCtrl($scope, memberService){
    var vm = this;

    vm.test = "hello";
    memberService.getMembers()
      .then(function(data){
        console.log(data);
        vm.members = data;
        return vm.members;
      });

  }
})();
(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('member', member)
    .controller('memberCtrl', memberCtrl)

    memberCtrl.$inject = ['$scope', '$localStorage', 'memberService', 'conversationService'];

  function member(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <member-info></member-info>
                  <member-convo
                    sender="vmChild.localUser"
                    recipient="vm.selected._id"
                    convo="vm.selected.convo">
                  </member-convo>
                `,
      controller: 'memberCtrl',
      controllerAs: 'vmChild'
    }
    return directive;
  }

  function memberCtrl($scope, $localStorage, memberService, conversationService){
    var vmChild = this;
    vmChild.localUser = $localStorage.user;

    memberService.getMembers()
      .then(function(data){
        vmChild.members = data[0].username;
        return vmChild.members;
      });

  }
})();
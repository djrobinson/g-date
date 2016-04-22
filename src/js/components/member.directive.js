(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('member', member)
    .controller('memberCtrl', memberCtrl)

    memberCtrl.$inject = ['$scope', 'memberService', '$localStorage'];

  function member(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: ` <p> {{vmChild.localUser}} {{vm.selected._id}} </p>
                  <member-info></member-info>
                  <member-convo></member-convo>
                `,
      controller: 'memberCtrl',
      controllerAs: 'vmChild'
    }
    return directive;
  }

  function memberCtrl($scope, memberService, $localStorage){
    var vmChild = this;
    vmChild.localUser = $localStorage.user;

    console.log("Member directive local: ", $localStorage.user);
    vmChild.test = "hello";
    memberService.getMembers()
      .then(function(data){
        vmChild.members = data[0].username;
        return vmChild.members;
      });

  }
})();
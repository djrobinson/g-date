(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('member', member)
    .controller('memberCtrl', memberCtrl)

    memberCtrl.$inject = ['$scope', 'memberService'];

  function member(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: ` <h2>Member Main</h2>
                  <p>Here's the member: {{vm.selected}}</p>
                  <member-convo item="item"></member-convo>
                  <member-info></member-info>
                `,
      controller: 'memberCtrl',
      controllerAs: 'vmChild'
    }
    return directive;
  }

  function memberCtrl($scope, memberService){
    var vmChild = this;


    vmChild.test = "hello";
    memberService.getMembers()
      .then(function(data){
        console.log(data);
        vmChild.members = data[0].username;
        return vmChild.members;
      });

  }
})();
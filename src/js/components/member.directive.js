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
      template: ` <h2>Member Main</h2>
                  <p>{{vm.test}}
                  <p>Here's the members: {{vm.members}}</p>
                  <input type="text" ng-model="item">
                  <h4>{{item}}</h4>
                  <member-convo item="item"></member-convo>
                  <member-info></member-info>
                `,
      controller: 'memberCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function memberCtrl($scope, memberService){
    var vm = this;

    vm.test = "hello";
    memberService.getMembers()
      .then(function(data){
        console.log(data);
        vm.members = data[0].username;
        return vm.members;
      });

  }
})();
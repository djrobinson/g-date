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
                  <p>Here's the members: {{members}}</p>
                  <member-convo></member-convo>
                  <member-info></member-info>
                `,
      controller: 'memberCtrl',
      link: function(scope, element, attrs) {
        scope.$watch('members', function(newVal) {
            console.log(scope.members);
        }, true);
      }
    }
    return directive;
  }

  function memberCtrl($scope, memberService){
    var vm = this;

    return memberService.getMembers()
      .then(function(data){
        console.log(data);
        $scope.members = data[0].username;
        return $scope.members;
      });
  }
})();
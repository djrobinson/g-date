(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberIcon', memberIcon)
    .controller('memberIconCtrl', memberIconCtrl)

  function memberIcon(){
    var directive = {
      restrict: 'EA',
      scope: {
        id: '=',
        slug: '=',
        avatar: '=',
        username: '=',
        first: '=',
        last: '=',
        set: '&'
      },
      templateUrl: 'js/components/member.icon.component/member.icon.html',
      controller: 'memberIconCtrl',
      controllerAs: 'vmIcon'
    }
    return directive;
  }

  function memberIconCtrl($scope){
    var vmIcon = this;
    vmIcon.run = function(){
      $scope.set({id: $scope.id});
    }
  }
})();
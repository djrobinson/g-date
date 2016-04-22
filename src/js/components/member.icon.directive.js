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
      template: `
                  <div class="col-md-12">
                    <div class="col-md-4">
                      <img ng-src="{{avatar}}" alt="profile_pic" />
                    </div>
                    <div class="col-md-8">
                      <h4><a ui-sref="members.member({ member_id: id })">{{username}}</a></h4>
                      <h5>{{first}} {{last}}</h5>
                      <button ng-click="vmIcon.run()">See Details</button>
                    </div>
                  </div>
                `,
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
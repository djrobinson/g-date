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
                  <div class="col-md-12 panel panel-primary">
                    <a ui-sref="members.member({ member_id: id })" ng-click="vmIcon.run()">
                      <div class="col-md-4">
                        <img ng-src="{{avatar}}" alt="profile_pic" />
                      </div>
                      <div class="col-md-8">
                        <h3>{{username}}</h3>
                        <h4>{{first}} {{last}}</h4>
                      </div>
                    </a>
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
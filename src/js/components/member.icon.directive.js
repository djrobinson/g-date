(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberIcon', memberIcon)

  function memberIcon(){
    var directive = {
      restrict: 'EA',
      scope: {
        id: '=',
        avatar: '=',
        username: '=',
        first: '=',
        last: '='
      },
      template: `
                  <div class="col-md-12">
                    <div class="col-md-4">
                      <img ng-src="{{avatar}}" alt="profile_pic" />
                    </div>
                    <div class="col-md-8">
                      <h4><a ui-sref="members.member({ member_id: id })">{{username}}</a></h4>
                      <h5>{{first}} {{last}}</h5>
                    </div>
                  </div>
                `
    }
    return directive;
  }
})();
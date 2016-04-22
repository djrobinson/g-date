(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profileEdit', profileEdit)

  function profileEdit(){
    var directive = {
      restrict: 'EA',
      template: `
                  <h2>Profile Edit</h2>
                  <form ng-submit="vmProf.updateProfile()">
                    <input type="text" ng-model="vmProf.member.username" />
                    <input type="text" ng-model="vmProf.member.email" />
                    <input type="text" ng-model="vmProf.member.phone" />
                    <input type="text" ng-model="vmProf.member.names.firstName" />
                    <input type="text" ng-model="vmProf.member.names.lastName" />
                    <input type="text" ng-model="vmProf.member.slug" />

                    <input type="submit">
                  </form>

                  <button ng-click="vmProf.deleteProfile()">Delete Profile</button>
                `
    }
    return directive;
  }
})();
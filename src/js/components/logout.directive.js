(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('logout', logout)
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['authService', '$localStorage', '$scope'];

  function logout(){
    var directive = {
      restrict: 'EA',
      template: `
                 <button class="btn btn-default" ng-click="vm.logout()">Logout</button>
                `,
      controller: 'logoutCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function logoutCtrl(authService, $localStorage, $scope){
      var vm = this;


      vm.logout = function(){
      authService.logout(function () {
                           window.location = "/"
                       });
      }
    }
})();
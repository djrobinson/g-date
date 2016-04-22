(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('logout', logout)
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$localStorage', '$scope', 'authService'];

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

  function logoutCtrl($localStorage, $scope, authService){
      var vm = this;
      vm.logout = function(){
      authService.logout(function () {
                           window.location = "/"
                       });
      }
    }
})();
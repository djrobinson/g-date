(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('login', login)
    .controller('loginCtrl', loginCtrl)

  loginCtrl.$inject = ['authService', '$scope', '$localStorage', '$location'];

  function login(){
    var directive = {
      restrict: 'EA',
      template: ` <h2>Login</h2>
                  <form ng-submit="vm.login()">
                    <h4>Email</h4>
                    <input type="text" ng-model="login.email" /><br>
                    <h4>Password</h4>
                    <input type="text" ng-model="login.password" /><br>
                    <input type="submit" />
                  </form>

                `,
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function loginCtrl(authService, $scope, $localStorage, $location){
    var vm = this;

    vm.login = function(){
      authService.login($scope.login)
      .then(function(res){
        $localStorage.token = res.data.token;
        $localStorage.user = res.data.user._id;
        window.location = "/#/members"
      })
    }
  }
})();
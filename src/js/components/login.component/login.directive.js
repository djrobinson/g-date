(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('login', login)
    .controller('loginCtrl', loginCtrl)

  loginCtrl.$inject = ['$scope', '$localStorage', '$location', 'authService'];

  function login(){
    var directive = {
      restrict: 'EA',
      templateUrl: '/js/components/login.component/login.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function loginCtrl($scope, $localStorage, $location, authService){
    var vm = this;

    vm.login = function(){
      authService.login($scope.login)
      .then(function(res){
        $localStorage.token = res.data.token;
        $localStorage.user = res.data.user._id;
        $localStorage.geo = res.data.user.address.geo;
        window.location = "/#/members"
      })
    }
  }
})();
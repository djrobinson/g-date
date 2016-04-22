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
      template: ` <h2>Login</h2><br>
                  <form ng-submit="vm.login()">
                    <div class="col-md-12">
                      <div class="form-group col-md-6 col-md-offset-3">
                        <div class="col-md-3">
                         <h4>Email</h4>
                        </div>
                        <div class="input-group col-md-9">
                          <input type="text" ng-model="login.email" class="form-control col-md-10" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group col-md-6 col-md-offset-3">
                        <div class="col-md-3">
                         <h4>Password</h4>
                        </div>
                        <div class="input-group col-md-9">
                          <input type="password" ng-model="login.password" class="form-control col-md-10" placeholder="Password">
                        </div>
                      </div>
                    </div>
                    <input type="submit" class="btn btn-primary btn-lg" value="login" />
                  </form>

                `,
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
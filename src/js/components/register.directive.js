(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('register', register)
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['authService', '$localStorage', '$scope'];

  function register(){
    var directive = {
      restrict: 'EA',
      template: `<h2>Register</h2>
                 <form ng-submit="vm.register()">
                   <h4>Username</h4>
                   <input type="text" ng-model="user.username"><br>
                   <h4>Slug</h4>
                   <input type="text" ng-model="user.slug"><br>
                   <h4>First Name</h4>
                   <input type="text" ng-model="user.firstName"><br>
                   <h4>Last Name</h4>
                   <input type="text" ng-model="user.lastName"><br>
                   <h4>Email</h4>
                   <input type="text" ng-model="user.email"><br>
                   <h4>Password</h4>
                   <input type="password" ng-model="user.password"><br>
                   <h4>Date of Birth</h4>
                   <input type="date" ng-model="user.dob"><br>
                   <h4>Zip Code</h4>
                   <input type="text" ng-model="user.zipcode"><br><br>
                   <input type="submit" class="btn btn-default" />
                 </form>
                 <button class="btn btn-default" ng-click="vm.logout()">Logout</button>
                `,
      controller: 'registerCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function registerCtrl(authService, $localStorage, $scope){
      var vm = this;

      var postObj = {};


      vm.register = function(){
        postObj = {
              username: $scope.user.username,
              names: {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName
              },
              avatar: "djrblah",
              email: $scope.user.email,
              password: $scope.user.password,
              dob: $scope.user.dob,
              phone: "77777777",
              address: {
                zipcode: $scope.user.zipcode,
                geo: {
                  lng: 0,
                  lat: 0
                },
                suite: "djrblah",
                city: "djrblah",
                street: "djrblah"
              },
              website: "djrblah",
              company: {
                bs: "djrblah",
                catchPhrase: "djrblah",
                name: "djrblah"
              },
              slug: $scope.user.slug,
              gender: 0,
              interestedIn: [
                0
              ]
            }
        authService.register(postObj)
          .then(function(res){
              console.log(res);
              $localStorage.token = res.data.token;
              $localStorage.user = res.data.data._id;
              window.location = "/#/members"
            })
      }

      vm.logout = function(){
      authService.logout(function () {
                           window.location = "/"
                       });
      }
    }
})();


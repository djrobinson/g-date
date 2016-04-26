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
      templateUrl: '/js/components/register.component/register.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function registerCtrl(authService, $localStorage, $scope){
      var vm = this;

      var postObj = {};
      $scope.user = {};
      $scope.user.interestedIn = [];

      $scope.updateInterest = function(num){
          $scope.user.interestedIn.push(num);
          console.log($scope.user.interestedIn);
        }

      vm.register = function(){
        console.log($scope.user.interestedIn);
        postObj = {
              username: $scope.user.username,
              names: {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName
              },
              description: $scope.user.description,
              avatar: $scope.user.avatar,
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
                suite: null,
                city: $scope.user.city,
                street: null
              },
              website: null,
              company: {
                bs: $scope.user.company[0],
                catchPhrase: null,
                name: null
              },
              slug: $scope.user.username,
              gender: $scope.user.gender,
              interestedIn: $scope.user.interestedIn
            }

        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
            postObj.address.geo.lng = position.coords.longitude;
            postObj.address.geo.lat = position.coords.latitude;
            console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
            authService.register(postObj)
                .then(function(res){
                    console.log(res.data.data);
                    $localStorage.token = res.data.token;
                    $localStorage.user = res.data.data._id;
                    $localStorage.geo = res.data.data.address.geo;
                    window.location = "/#/members"
                  })
            }
        }




      vm.logout = function(){
      authService.logout(function () {
                           window.location = "/"
                       });
      }
    }
})();


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
      template: ` <div class="row">
                    <div class="col-md-8 col-md-offset-2 jumbotron">
                     <h1>Register</h1><br>
                     <form class="input-group col-md-12" ng-submit="vm.register()">
                      <fieldset>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Username</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.username" class="form-control col-md-10" placeholder="Username">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Password</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="password" ng-model="user.password" class="form-control col-md-10" placeholder="Password">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Slug</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.slug" class="form-control col-md-10" placeholder="Slug">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>First Name</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.firstName" class="form-control col-md-10" placeholder="First Name">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Last Name</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.lastName" class="form-control col-md-10" placeholder="Last Name">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Email</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.email" class="form-control col-md-10" placeholder="Email">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Date of Birth</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="date" ng-model="user.dob" class="form-control col-md-10">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Zip Code</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.zipcode" class="form-control col-md-10">
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-2">
                           <h4>Avatar</h4>
                          </div>
                          <div class="input-group col-md-9">
                            <input type="text" ng-model="user.avatar" class="form-control col-md-10">
                          </div>
                        </div>
                        <input type="submit" class="btn btn-primary btn-lg" value="Register" />
                      </fieldset>
                     </form>
                    </div>
                  </div>
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

        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
            postObj.address.geo.lng = position.coords.longitude;
            postObj.address.geo.lat = position.coords.latitude;
            console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
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


(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersAll', membersAll)
    .controller('membersCtrl', membersCtrl)

    membersCtrl.$inject = ['$scope','memberService', 'matchService', '$localStorage'];

  function membersAll(){
    var directive = {
      restrict: 'EA',
      template: `
                    <div class="col-md-4 sidebar">
                      <h2>Members All</h2>
                      <button ng-show="vm.iterator" class="btn btn-default" ng-click="vm.iterate()">Last 10</button>
                      <a class="btn btn-default" ui-sref="members.search">Search</a>
                      <a class="btn btn-default" ng-click="vm.reset()">Reset</a>
                      <a class="btn btn-default" ng-click="vm.getMatches()">Matches</a>
                      <button class="btn btn-default" ng-click="vm.iterate()">Next 10</button>
                      <br>
                      <br>
                      <div ng-repeat="member in vm.members">
                        <member-icon
                          id="member._id"
                          slug="member.slug"
                          avatar="member.avatar"
                          username="member.username"
                          first="member.names.firstName"
                          last="member.names.lastName"
                          set="vm.setSelected(id)">
                        </member-icon>
                      </div>
                    </div>
                    <div class="col-md-8 main col-md-offset-4" ui-view>

                    </div>
                `,
      controller: 'membersCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function membersCtrl($scope, memberService, matchService, $localStorage){
    var vm = this;


    function distance(lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
      var dLon = (lon2-lon1).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      console.log("Distance!! ", d);
      return d;
    }

    /** Converts numeric degrees to radians */
    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }



    vm.setSelected = function(id){

      if ( id ){

        memberService.getMember(id).then(function(data){
          var geo1 = $localStorage.geo;
          vm.selected = data;
          var geo2 = vm.selected.address.geo;
          var apart = distance(geo1.lng, geo1.lat, geo2.lng, geo2.lat);
          vm.selected.distance = apart;
        })
      }
    };

    vm.iterator = 0;
    vm.iterate = function(){
      vm.iterator++;
      vm.getPage();
    }
    vm.test = "hello";
    vm.getPage = function(){
      memberService.getMembers(vm.iterator)
        .then(function(data){
          vm.members = data;
          return vm.members;
        });
      }
    vm.getPage();

    vm.reset = function(){
      vm.iterator = 0;
      vm.getPage();
    }

    vm.memberSearch = function(newMembers){
      vm.members = newMembers;
      return vm.members;
    }

    vm.getMatches = function(){
      var member_id = $localStorage.user;
      var retVal = [];
      matchService.getMatches(member_id)
        .then(function(data){
          data.forEach(function(mem){
            memberService.getMember(mem._id)
              .then(function(info){
                retVal.push(info);

              })
          })
          vm.members = retVal;
          return vm.members;
        })

    }
  }
})();
  (function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberInfo', memberInfo)
    .controller('infoCtrl', infoCtrl)

    infoCtrl.$inject = ['$localStorage', '$scope', 'matchService'];

  function memberInfo(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <div ng-show="vm.selected" class="row">
                    <br>
                    <br>
                    <br>

                    <div class="panel panel-primary">
                      <div class="panel-heading">
                        <h2 class="panel-title">Member Info</h2>
                      </div>
                      <div class="panel-body">
                        <div class="col-md-3">
                          <img src="{{vm.selected.avatar}}" alt="avatar" />
                          <br>
                          <br>
                          <button ng-click="vmInfo.createMatch(vm.selected._id)" class="btn btn-primary">Match w/ this person</button>
                        </div>
                        <div class="col-md-9">
                          <h1>{{vm.selected.username}}</h1>
                          <h3>{{vm.selected.names.firstName}} {{vm.selected.names.lastName}}</h3>
                          <h3>{{vm.selected.email}}</h3>
                          <p>{{vm.selected.description}}</p>
                          <p>{{vmInfo.distance}}</p>


                        </div>
                      </div>
                    </div>
                  </div>
                `,
      controller: 'infoCtrl',
      controllerAs: 'vmInfo'
    }
    return directive;
  }

  function infoCtrl($localStorage, $scope, matchService){
    var vmInfo = this;
    var geo1 = $localStorage.geo;
    var geo2 = $scope.vm.selected.address.geo;

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
      vmInfo.distance = d;
      return d;
    }

    /** Converts numeric degrees to radians */
    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }

    var apart = distance(geo1.lng, geo1.lat, geo2.lng, geo2.lat);

    var member_id = $localStorage.user;
    vmInfo.createMatch = function(match){
      var _match = {
        _match: match
      }
      matchService.createMatch(member_id, _match)
        .then(function(data){
          console.log(data);
        })
    }
  }
})();
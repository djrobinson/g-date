(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersAll', membersAll)
    .controller('membersCtrl', membersCtrl)

    membersCtrl.$inject = ['$scope','$localStorage','memberService', 'matchService', 'conversationService'];

  function membersAll(){
    var directive = {
      restrict: 'EA',
      templateUrl: 'js/components/members.all.component/members.all.html',
      controller: 'membersCtrl',
      controllerAs: 'vm'
    }
    return directive;
  }

  function membersCtrl($scope, $localStorage, memberService, matchService, conversationService){
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
          var loggedInUser = $localStorage.user;
          var geo1 = $localStorage.geo;
          vm.selected = data;
          getConvo(loggedInUser, vm.selected._id);
          var geo2 = vm.selected.address.geo;
          var apart = distance(geo1.lng, geo1.lat, geo2.lng, geo2.lat);
          vm.selected.distance = apart;
          vm.selected.matched = vm.selected._matches.some(function(user){
            if (user === loggedInUser){
              return true;
            }
          })
        })
      }
    };

    function getConvo(sender, recipient){
      conversationService.getConversation(sender, recipient)
        .then(function(data){
          if (data.data.length === 1){
            vm.selected.convo = data.data[0].messages;
            console.log(vm.selected.convo);
            return vm.selected.convo;
          }
        });
    }


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
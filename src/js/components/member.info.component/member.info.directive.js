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
      templateUrl: '/js/components/member.info.component/member.info.html',
      controller: 'infoCtrl',
      controllerAs: 'vmInfo'
    }
    return directive;
  }

  function infoCtrl($localStorage, $scope, matchService){
    var vmInfo = this;


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
(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)
    .controller('convoCtrl', convoCtrl)

    convoCtrl.$inject = ['$scope', '$localStorage','conversationService'];

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      scope: {
        sender: '=',
        recipient: '=',
        convo: '='
      },
      templateUrl: 'js/components/member.convo.component/member.convo.html',
      controller: 'convoCtrl',
      controllerAs: 'vmConvo'
    }
    return directive;
  }

  function convoCtrl($scope, $localStorage, conversationService){
    var vmConvo = this;
    vmConvo.setClass = function(sender){
      if ($localStorage.user === sender){
        return 'alert alert-dismissable alert-success';
      } else {
        return 'alert alert-dismissable alert-info';
      };
    }
    // function getConvo(){
    //   console.log($scope.sender, $scope.recipient);
    //   conversationService.getConversation($scope.sender, $scope.recipient)
    //     .then(function(data){
    //       if (data){
    //         vmConvo.convo = data.data[0].messages;
    //         return vmConvo.convo;
    //       }
    //     });
    // }
    // if ($scope.sender && $scope.recipient){
    //   getConvo();
    // }

    vmConvo.createConvo = function(){
      var form = {
        _recipient: $scope.recipient,
        content: vmConvo.convoText
      }
      conversationService.createConversation($scope.sender, form)
        .then(function(data){
          vmConvo.getConvo();
        });
    }

  }
})();
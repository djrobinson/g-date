(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)
    .controller('convoCtrl', convoCtrl)

    convoCtrl.$inject = ['conversationService', '$scope'];

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      scope: {
        sender: '=',
        recipient: '='
      },
      template: `
                  <h2>Member Convo</h2>
                  <div ng-repeat="message in vmConvo.convo">
                      <p>{{message._sender}} {{message.content}}</p>
                  </div>
                  <input type="text" ng-model="vmConvo.convoText" />
                  <button class="btn btn-default" ng-click="vmConvo.getConvo()">Get Convo</button>
                  <button class="btn btn-default" ng-click="vmConvo.createConvo()">Create Convo</button>
                `,
      controller: 'convoCtrl',
      controllerAs: 'vmConvo'
    }
    return directive;
  }

  function convoCtrl(conversationService, $scope){
    var vmConvo = this;
    console.log($scope.sender+"  lajsdfklajsdf "+$scope.recipient);
    vmConvo.getConvo = function(){
      conversationService.getConversation($scope.sender, $scope.recipient)
        .then(function(data){
          console.log(data.data[0].messages);
          vmConvo.convo = data.data[0].messages;
          return vmConvo.convo;
        });
    }



    vmConvo.createConvo = function(){
      var form = {
        _recipient: $scope.recipient,
        content: vmConvo.convoText
      }
      conversationService.createConversation($scope.sender, form)
        .then(function(data){
          console.log("Created Convo: "+data);
          vmConvo.getConvo();
        });
    }

  }
})();
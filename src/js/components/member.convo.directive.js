(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)
    .controller('convoCtrl', convoCtrl)

    convoCtrl.$inject = ['conversationService', '$scope', '$localStorage'];

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      scope: {
        sender: '=',
        recipient: '='
      },
      template: ` <div ng-show="recipient">
                    <h2>Member Convo</h2>
                    <div class="row">
                      <div ng-repeat="message in vmConvo.convo">
                        <div class="row">
                          <div ng-class="vmConvo.setClass(message._sender)"
                            <h4>{{message.content}}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                    <input type="text" ng-model="vmConvo.convoText" />
                    <button class="btn btn-default" ng-click="vmConvo.getConvo()">Get Convo</button>
                    <button class="btn btn-default" ng-click="vmConvo.createConvo()">Create Convo</button>
                  </div>
                `,
      controller: 'convoCtrl',
      controllerAs: 'vmConvo'
    }
    return directive;
  }

  function convoCtrl(conversationService, $scope, $localStorage){
    var vmConvo = this;
    vmConvo.setClass = function(sender){
      console.log(sender);
      if ($localStorage.user === sender){
        console.log("matches!")
        return 'alert alert-dismissable alert-success';
      } else {
        return 'alert alert-dismissable alert-info';
      };
    }
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
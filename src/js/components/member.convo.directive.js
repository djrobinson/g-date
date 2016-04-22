(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('memberConvo', memberConvo)
    .controller('convoCtrl', convoCtrl)

    convoCtrl.$inject = ['$localStorage'];

  function memberConvo(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <h2>Member Convo</h2>
                  <p></p>
                  <button class="btn btn-default" ng-click="vmConvo.createConvo()">Create Convo</button>
                `,
      controller: 'convoCtrl',
      controllerAs: 'vmConvo'
    }
    return directive;
  }

  function convoCtrl(conversationService){
    var vmConvo = this;

    function getConvo(){
      conversationService.getConverstaion(sender, recipient)
        .then(function(data){
          vm.convo = data;
          return vm.convo;
        });
    }

    vmConvo.createConvo = function(){
      console.log("Create Convo!");
    }

  }
})();
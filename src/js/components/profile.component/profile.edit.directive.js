(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profileEdit', profileEdit)

  function profileEdit(){
    var directive = {
      restrict: 'EA',
      templateUrl: 'js/components/profile.component/profile.edit.html'
    }
    return directive;
  }
})();
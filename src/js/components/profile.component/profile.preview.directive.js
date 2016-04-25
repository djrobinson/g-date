(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profilePreview', profilePreview)

  function profilePreview(){
    var directive = {
      restrict: 'EA',
      scope: true,
      templateUrl: 'js/components/profile.component/profile.preview.html'
    }
    return directive;
  }
})();
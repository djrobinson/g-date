(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profilePreview', profilePreview)

  function profilePreview(){
    var directive = {
      restrict: 'EA',
      template: '<h2>Profile Preview</h2>'
    }
    return directive;
  }
})();
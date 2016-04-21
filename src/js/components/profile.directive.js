(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profile', profile)

  function profile(){
    var directive = {
      restrict: 'EA',
      template: ` <h2>Profile</h2>
                  <profile-preview></profile-preview>
                  <profile-edit></profile-edit>

                `
    }
    return directive;
  }
})();
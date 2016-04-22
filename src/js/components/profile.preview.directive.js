(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profilePreview', profilePreview)

  function profilePreview(){
    var directive = {
      restrict: 'EA',
      scope: true,
      template: `
                  <h2>Profile Preview</h2>
                  <h3>{{vmProf.member.username}}</h3>
                  <h3>{{vmProf.member.email}}</h3>
                  <h3>{{vmProf.member.phone}}</h3>
                  <h3>{{vmProf.member.names.firstName}}</h3>
                  <h3>{{vmProf.member.names.lastName}}</h3>
                  <h3>{{vmProf.member.names.slug}}</h3>
                `
    }
    return directive;
  }
})();
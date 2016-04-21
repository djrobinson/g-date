(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersSearch', membersSearch)

  function membersSearch(){
    var directive = {
      restrict: 'EA',
      template: `
                  <div class="col-md-12">
                    <h2>Members Search</h2>
                  </div>

                `
    }
    return directive;
  }
})();
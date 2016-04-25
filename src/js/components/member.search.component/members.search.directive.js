(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('membersSearch', membersSearch)
    .controller('searchCtrl', searchCtrl)

    searchCtrl.$inject = ['searchService', '$scope']

  function membersSearch(){
    var directive = {
      restrict: 'EA',
      scope: {
        members: '='
      },
      template: `
                  <div class="col-md-12">
                    <h2>Members Search</h2>
                    <form ng-submit="vmSearch.search()">
                      <h3>username</h3>
                      <input type="text" ng-model="search.username" /><br>
                      <h3>Email</h3>
                      <input type="text" ng-model="search.email" /><br>
                      <h3>Gender</h3>
                      <input type="radio" name="gender" ng-model="search.gender" value="male"> Male<br>
                      <input type="radio" name="gender" ng-model="search.gender" value="female"> Female<br>
                      <input type="radio" name="gender" ng-model="search.gender" value="other"> Other<br>
                      <h3>Age Low</h3>
                      <input type="text" ng-model="search.minAge">
                      <h3>Age high</h3>
                      <input type="text" ng-model="search.maxAge">
                      <input type="submit">
                    </form>
                  </div>
                `,
      controller: 'searchCtrl',
      controllerAs: 'vmSearch'
    }
    return directive;
  }

  function searchCtrl(searchService, $scope){
    var vmSearch = this;

    vmSearch.search = function(){
      console.log($scope.members);
      searchService.search($scope.search)
        .then(function(data){
          $scope.members = data.data;
          // $scope.$parent.vm.members = data.data;
          // $scope.vm.memberSearch(data.data);
        })
    }

  }
})();
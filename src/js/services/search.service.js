(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('searchService', searchService);

    searchService.$inject = ['$http', '$log'];

    function searchService($http, $log) {
        return {
            search: search
        };


        function search(input) {
            console.log(input);
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/search', {
                    params:{
                        username: input.username,
                        email: input.email,
                        gender: input.gender,
                        minAge: input.minAge,
                        maxAge: input.maxAge
                    }
                })
                .then(searchComplete)
                .catch(searchFailed);

            function searchComplete(response) {
                return response.data;
            }

            function searchFailed(error) {
                $log.error('XHR Failed for search.' + error);
                return error;
            }
        }
    }
})();
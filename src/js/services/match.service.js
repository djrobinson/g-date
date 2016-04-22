(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('matchService', matchService);

    matchService.$inject = ['$http', '$log'];

    function matchService($http, $log) {
        return {
            getMatches: getMatches,
            createMatch: createMatch,
            deleteMatch: deleteMatch
        };

        function getMatches(member_id) {
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id+'/matches')
                .then(matchesComplete)
                .catch(matchesComplete);

            function matchesComplete(response) {
                console.log(response.data);
                return response.data.data;
            }

            function matchesFailed(error) {
                $log.error('XHR Failed for matches.' + error.data);
            }
        }

        function createMatch(member_id, _match) {
            return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id+'/matches', _match)
                .then(createMatchComplete)
                .catch(createMatchFailed);

            function createMatchComplete(response) {
                console.log(response.data);
                return response.data.results;
            }

            function createMatchFailed(error) {
                $log.error('XHR Failed for matches.' + error.data);
            }
        }

        function deleteMatch() {
            return $http.delete('/members/:member_id/matches/:match_id')
                .then(deleteMatchComplete)
                .catch(deleteMatchFailed);

            function deleteMatchComplete(response) {
                return response.data.results;
            }

            function deleteMatchFailed(error) {
                $log.error('XHR Failed for matches.' + error.data);
            }
        }
    }
})();
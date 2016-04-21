(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('matchService', matchService);

    matchService.$inject = ['$http', 'logger'];

    function matchService($http, logger) {
        return {
            getMatches: getMatches,
            createMatch: createMatch,
            deleteMatch: deleteMatch
        };

        function getMatches() {
            return $http.get('/members/:member_id/matches')
                .then(matchesComplete)
                .catch(matchesComplete);

            function matchesComplete(response) {
                return response.data.results;
            }

            function matchesFailed(error) {
                logger.error('XHR Failed for matches.' + error.data);
            }
        }

        function createMatch() {
            return $http.post('/members/:member_id/matches')
                .then(createMatchComplete)
                .catch(createMatchFailed);

            function createMatchComplete(response) {
                return response.data.results;
            }

            function createMatchFailed(error) {
                logger.error('XHR Failed for matches.' + error.data);
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
                logger.error('XHR Failed for matches.' + error.data);
            }
        }
    }
})();
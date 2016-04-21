(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('memberService', memberService);

    memberService.$inject = ['$http', 'logger'];

    function memberService($http, logger) {
        return {
            getMembers: getMembers,
            createMember: createMember,
            deleteMember: deleteMember,
            getMember: getMember,
            updateMember: updateMember
        };

        function getMembers() {
            return $http.get('/members')
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                logger.error('XHR Failed for members.' + error.data);
            }
        }

        function createMember() {
            return $http.post('/members')
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                logger.error('XHR Failed for members.' + error.data);
            }
        }

        function deleteMember() {
            return $http.delete('/members/:member_id')
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                logger.error('XHR Failed for members.' + error.data);
            }
        }

        function getMember() {
            return $http.get('/members/:member_id')
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                logger.error('XHR Failed for members.' + error.data);
            }
        }

        function updateMember() {
            return $http.put('/members/:member_id')
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                logger.error('XHR Failed for members.' + error.data);
            }
        }
    }
})();
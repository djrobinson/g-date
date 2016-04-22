(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('memberService', memberService);

    memberService.$inject = ['$http', '$log'];

    function memberService($http, $log) {
        return {
            getMembers: getMembers,
            createMember: createMember,
            deleteMember: deleteMember,
            getMember: getMember,
            updateMember: updateMember
        };

        var urlBase = 'https://galvanize-student-apis.herokuapp.com/gdating/';

        function getMembers(iterator) {
            var offset = iterator * 10;
            return $http.get( 'https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10&offset=' + offset )
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                console.log(response);
                return response.data.data;
            }

            function membersFailed(error) {
                $log.error('XHR Failed for members.' + error.data);
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
                $log.error('XHR Failed for members.' + error.data);
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
                $log.error('XHR Failed for members.' + error.data);
            }
        }

        function getMember(member_id) {
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/'+id)
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data.results;
            }

            function membersFailed(error) {
                $log.error('XHR Failed for members.' + error.data);
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
                $log.error('XHR Failed for members.' + error.data);
            }
        }
    }
})();
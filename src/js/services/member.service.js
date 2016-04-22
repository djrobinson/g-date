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

        var urlBase = 'c';

        function getMembers(iterator) {
            var offset = iterator * 10;
            return $http.get( 'https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10&offset=' + offset )
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
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

        function deleteMember(member_id) {
            console.log("delete ", member_id);
            return $http.delete('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id)
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data;
            }

            function membersFailed(error) {
                $log.error('XHR Failed for members.' + error.data);
            }
        }

        function getMember(member_id) {
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id)
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                console.log(response.data);
                return response.data.data;
            }

            function membersFailed(error) {

                $log.error('XHR Failed for members.' + error);
            }
        }

        function updateMember(member_id, body) {
            return $http.put('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id, body)
                .then(membersComplete)
                .catch(membersComplete);

            function membersComplete(response) {
                return response.data;
            }

            function membersFailed(error) {
                console.log(error);
                $log.error('XHR Failed for members.' + error);
            }
        }
    }
})();
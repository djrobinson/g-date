(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('conversationService', conversationService);

    conversationService.$inject = ['$http', 'logger'];

    function authService($http, logger) {
        return {
            register: register,
            login: login
        };

        function register() {
            return $http.post('/auth/register')
                .then(registerComplete)
                .catch(registerFailed);

            function registerComplete(response) {
                return response.data.results;
            }

            function registerFailed(error) {
                logger.error('XHR Failed for register.' + error.data);
            }
        }
    }
})();
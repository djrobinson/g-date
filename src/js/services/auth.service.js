(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('authService', authService);

    authService.$inject = ['$http', 'logger'];

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

        function login() {
            return $http.post('/auth/login')
                .then(loginComplete)
                .catch(registerFailed);

            function loginComplete(response) {
                return response.data.results;
            }

            function loginFailed(error) {
                logger.error('XHR Failed for login.' + error.data);
            }
        }
    }
})();
(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('authService', authService);

    authService.$inject = ['$http', '$log', '$localStorage'];

    function authService($http, $log, $localStorage) {
        return {
            register: register,
            login: login,
            logout: logout
        };

        var urlBase = 'https://galvanize-student-apis.herokuapp.com/gdating';

        function register(info) {
            console.log(info);
            return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/auth/register', info)
                .then(registerComplete)
                .catch(registerFailed);

            function registerComplete(response) {
                return response.data;
            }

            function registerFailed(error) {
                console.log("Register FaileD!");
                console.log(error);
                $log.error('XHR Failed for register.' + error);
                return error;
            }
        }

        function login(info) {
            return $http.post( 'https://galvanize-student-apis.herokuapp.com/gdating/auth/login', info)
                .then(loginComplete)
                .catch(loginFailed);

            function loginComplete(response) {
                console.log(response)
                return response.data;
            }

            function loginFailed(error) {
                $log.error('XHR Failed for login.' + error);
            }
        }

        function logout(success) {
               delete $localStorage.token;
               success();
           }
    }
})();
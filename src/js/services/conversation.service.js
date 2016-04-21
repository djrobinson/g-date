(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('conversationService', conversationService);

    conversationService.$inject = ['$http', 'logger'];

    function conversationService($http, logger) {
        return {
            register: register,
            login: login
        };

        function getConversations() {
            return $http.get('/members/:member_id/conversations')
                .then(conversationsComplete)
                .catch(conversationsFailed);

            function conversationsComplete(response) {
                return response.data.results;
            }

            function conversationsFailed(error) {
                logger.error('XHR Failed for conversations.' + error.data);
            }
        }

        function createConversation() {
            return $http.post('/members/:member_id/conversations')
                .then(createConvoComplete)
                .catch(createConvoFailed);

            function createConvoComplete(response) {
                return response.data.results;
            }

            function createConvoFailed(error) {
                logger.error('XHR Failed for create convo. ' + error.data);
            }
        }

        function getConversation() {
            return $http.get('/members/:member_id/conversations/:recipient_id')
                .then(getConversationComplete)
                .catch(getConversationFailed);

            function getConversationComplete(response){
                return response.data.results;
            }

            function getConversationFailed(error){
                logger.error('XHR Failed for get conversation ' + error.data);
            }
        }
    }
})();
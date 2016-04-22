(function(){
    'use strict'

    angular
        .module('datingApp')
        .factory('conversationService', conversationService);

    conversationService.$inject = ['$http', '$log'];

    function conversationService($http, $log) {
        return {
            getConversations: getConversations,
            createConversation: createConversation,
            getConversation: getConversation
        };

        function getConversations() {
            return $http.get('/members/:member_id/conversations')
                .then(conversationsComplete)
                .catch(conversationsFailed);

            function conversationsComplete(response) {
                return response.data.results;
            }

            function conversationsFailed(error) {
                $log.error('XHR Failed for conversations.' + error.data);
            }
        }

        function createConversation(member_id, input) {
            return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/members/'+member_id+'/conversations', input)
                .then(createConvoComplete)
                .catch(createConvoFailed);

            function createConvoComplete(response) {
                return response.data.results;
            }

            function createConvoFailed(error) {
                $log.error('XHR Failed for create convo. ' + error.data);
            }
        }

        function getConversation(sender, recipient) {
            console.log("Get conversations");
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/'+sender+'/conversations/'+recipient)
                .then(getConversationComplete)
                .catch(getConversationFailed);

            function getConversationComplete(response){
                console.log(response);
                return response.data;
            }

            function getConversationFailed(error){
                $log.error('XHR Failed for get conversation ' + error.data);
            }
        }
    }
})();
(function(){
  'use strict'

  angular
    .module('datingApp')
    .directive('profile', profile)
    .controller('profileCtrl', profileCtrl)

    profileCtrl.$inject = ['memberService', '$localStorage'];

  function profile(){
    var directive = {
      restrict: 'EA',
      template: ` <h2>Profile</h2>
                  <div class="row">
                    <profile-preview class="col-md-6"></profile-preview>
                    <profile-edit class="col-md-6"></profile-edit>
                  </div>

                `,
      controller: 'profileCtrl',
      controllerAs: 'vmProf'
    }
    return directive;
  }

  function profileCtrl(memberService, $localStorage){
    var vmProf = this;
    var member_id = $localStorage.user;
    vmProf.userProfile = memberService.getMember(member_id)
                          .then(function(data){
                            console.log(data);
                            return data;
                          })

    vmProf.updateProfile = function(member_id){
      memberService.updateMember(member_id)
        .then(function(data){
          console.log(data);
        });
      }

    vmProf.deleteProfile = function(member_id){
      memberService.deleteMember(member_id)
        .then(function(data){
          console.log(data);
          //redirect
        });
    }
  }
})();
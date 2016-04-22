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
                            vmProf.member = data;
                            return vmProf.member;
                          })

    vmProf.updateProfile = function(){
      var member_id = vmProf.member._id;
      var postObj = {
              username: vmProf.member.username,
              names: {
                firstName: vmProf.member.names.firstName,
                lastName: vmProf.member.names.lastName
              },
              avatar: "djrblah",
              email: vmProf.member.email,
              password: "password",
              dob: "08/05/1989",
              phone: "77777777",
              address: {
                zipcode: "80211",
                geo: {
                  lng: 0,
                  lat: 0
                },
                suite: "djrblah",
                city: "djrblah",
                street: "djrblah"
              },
              website: "djrblah",
              company: {
                bs: "djrblah",
                catchPhrase: "djrblah",
                name: "djrblah"
              },
              slug: vmProf.member.slug,
              gender: 0,
              interestedIn: [
                0
              ]
            }
      memberService.updateMember(member_id, postObj)
        .then(function(data){
          console.log(data);
        });
      }

    vmProf.deleteProfile = function(){
      memberService.deleteMember(member_id)
        .then(function(data){
          console.log(data);
          //redirect
        });
    }
  }
})();
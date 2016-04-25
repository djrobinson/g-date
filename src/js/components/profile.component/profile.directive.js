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
                    <profile-edit class="col-md-6"></profile-edit>
                    <profile-preview class="col-md-6"></profile-preview>
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
              avatar: vmProf.member.avatar,
              email: vmProf.member.email,
              password: "password",
              dob: "08/05/1989",
              phone: vmProf.member.phone,
              address: {
                zipcode: vmProf.member.address.zipcode,
                geo: {
                  lng: 0,
                  lat: 0
                },
                suite: "djrblah",
                city: vmProf.member.address.city,
                street: "djrblah"
              },
              website: "djrblah",
              company: {
                bs: vmProf.member.company.bs,
                catchPhrase: "djrblah",
                name: "djrblah"
              },
              slug: vmProf.member.username,
              gender: vmProf.member.gender,
              interestedIn: [
                0
              ]
            }
      memberService.updateMember(member_id, postObj)
        .then(function(data){
          console.log(data);
          window.location = "/#/members"
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
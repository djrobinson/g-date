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
        memberService.getMember(member_id)
          .then(function(data){
            console.log(data);
            data.dob = new Date(formatDate(data.dob));
            console.log(data.dob);
            data.genders = {};
            vmProf.member = data;
            return vmProf.member;
          })

    vmProf.updateInterest = function(num){
      if (vmProf.member.interestedIn.indexOf(num) === -1){
        vmProf.member.interestedIn.push(num);
      } else {
        var i = vmProf.member.interestedIn.indexOf(num);
        vmProf.member.interestedIn.splice(i, 1);
      }
    }
    vmProf.updateProfile = function(){
      var member_id = vmProf.member._id;
      var postObj = {
              names: {
                firstName: vmProf.member.names.firstName,
                lastName: vmProf.member.names.lastName
              },
              description: vmProf.member.description,
              avatar: vmProf.member.avatar,
              dob: vmProf.member.dob.toString(),
              phone: vmProf.member.phone,
              address: {
                zipcode: vmProf.member.address.zipcode,
                suite: "test",
                geo: {
                  lng: vmProf.member.address.geo.lng,
                  lat: vmProf.member.address.geo.lat
                },
                city: vmProf.member.address.city,
                street: "test"
              },
              company: {
                bs: vmProf.member.company.bs,
                catchPhrase: "test",
                name: "test"
              },
              gender: vmProf.member.gender,
              interestedIn: vmProf.member.interestedIn
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

    function formatDate(date){
          console.log(date);
          date = new Date(date);
          var day = ("0" + date.getDate()).slice(-2);
          var month = ("0" + (date.getMonth() + 1)).slice(-2);
          var today = date.getFullYear()+"-"+(month)+"-"+(day) ;
          return today;
      }
  }
})();
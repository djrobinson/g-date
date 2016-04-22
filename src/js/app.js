// app.js
angular
    .module('datingApp', [
        'ui.router',
        'ngStorage'
        ])
    .config(config)
    .run(run)

function config($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/',
            template: '<home></home>'
        })

        .state('register', {
            url: '/register',
            template: '<register class="col-md-6 col-md-offset-3 text-center"></register>'
        })

        .state('login', {
            url: '/login',
            template: '<login class="col-md-6 col-md-offset-3 text-center"></login>'
        })

        .state('members', {
            url: '/members',
            template: '<members-all></members-all>'
        })

        .state('members.search', {
            url: '/search',
            template: '<members-search></members-search>'
        })

        .state('members.member', {
            url: '/member/:member_id',
            template: '<member></member>'
        })

        .state('profile', {
            url: '/profile',
            template: '<profile class="col-md-8 col-md-offset-2 text-center"></profile>'
        })
}

function run($rootScope, $state, $localStorage){
    $rootScope.$on( "$stateChangeStart", function(event, toState) {
        console.log("User in Local Storage ", $localStorage.user);
      if ( !$localStorage.token ) {
        $rootScope.showLogout = false;
        if ( toState.name == "members" || toState.name == "profile") {
            event.preventDefault();
            $state.go( "login" );
        }
      } else if ( $localStorage.token ) {
        $rootScope.showLogout = true;
        if ( toState.name == "login" || toState.name == "register" ) {
          event.preventDefault();
          $state.go( "members" );
        }
      }
    });
}

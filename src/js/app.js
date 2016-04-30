// app.js
angular
    .module('datingApp', [
        'ui.router',
        'ngStorage',
        'ui.bootstrap'
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
            template: '<register></register>'
        })

        .state('login', {
            url: '/login',
            template: '<login></login>'
        })

        .state('members', {
            url: '/members',
            template: '<members-all></members-all>'
        })

        .state('members.search', {
            url: '/search',
            template: '<members-search members="vm.members"></members-search>'
        })

        .state('members.member', {
            url: '/member/:slug',
            template: '<member></member>'
        })

        .state('profile', {
            url: '/profile',
            template: '<profile></profile>'
        })
}

function run($rootScope, $state, $localStorage){
    $rootScope.$on( "$stateChangeStart", function(event, toState) {
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
    //Interceptor is on POST for members
}

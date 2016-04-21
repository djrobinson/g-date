// app.js
angular
    .module('datingApp', [
        'ui.router'
        ])
    .config(config)

function config($stateProvider, $urlRouterProvider) {

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
            views: {
                '': {
                    template: '<div class="row text-center"><div class="col-sm-6"><div ui-view="all"></div></div><div class="col-sm-6"><div ui-view="search"></div></div></div>'
                    },
                'all@members': {
                    template: '<members-all></members-all>'
                },
                'search@members': {
                    template: '<members-search></members-search>'
                }
            }
        })

        .state('member', {
            url: '/member/:member_id',
            views: {
                '': {
                    template: '<div class="row text-center"><div class="col-sm-6"><div ui-view="conversations"></div></div><div class="col-sm-6"><div ui-view="info"></div></div></div>'
                    },
                'info@member': {
                    template: '<member-info></member-info>'
                },
                'conversations@member': {
                    template: '<member-convo></member-convo>'
                }
            }
        })

        .state('profile', {
            url: '/profile',
            views: {
                '': {
                    template: '<div class="row text-center"><div class="col-sm-6"><div ui-view="preview"></div></div><div class="col-sm-6"><div ui-view="edit"></div></div></div>'
                    },
                'preview@profile': {
                    template: '<profile-preview></profile-preview>'
                },
                'edit@profile': {
                    template: '<profile-edit></profile-edit>'
                }
            }
        });

};
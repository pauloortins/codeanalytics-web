'use strict';

//Setting up route
angular.module('mean.repositories').config(['$stateProvider',
    function($stateProvider) {

        // states for my app
        $stateProvider
            .state('all repositories', {
                url: '/repositories',
                templateUrl: 'public/repositories/views/list.html'
            });
    }
]);

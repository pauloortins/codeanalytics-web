'use strict';

//Repositories service used for articles REST endpoint
angular.module('mean.repositories').factory('Repositories', ['$resource', function($resource) {
    return $resource('repositories/:repositoryId', {
        repositoryId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

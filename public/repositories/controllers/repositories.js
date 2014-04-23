'use strict';

angular.module('mean.repositories').controller('RepositoriesController', ['$scope', '$stateParams', '$location', 'Global', 'Repositories', function ($scope, $stateParams, $location, Global, Repositories) {
    $scope.global = Global;
	
    $scope.find = function() {
        Repositories.query(function(repositories) {
            $scope.repositories = repositories;
        });

    };
}]);

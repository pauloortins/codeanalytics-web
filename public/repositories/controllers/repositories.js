'use strict';

angular.module('mean.repositories').controller('RepositoriesController', ['$scope', '$stateParams', '$location', 'Global', 'Repositories', function ($scope, $stateParams, $location, Global, Repositories) {
    $scope.global = Global;
	
    $scope.find = function() {
        Repositories.query(function(repositories) {
            $scope.repositories = repositories;
        });

    };

    $scope.create = function() {
        var repository = new Repositories({
            url: this.url
        });

        repository.$save(function(response) {
            $location.path('repositories');
        });

        this.url = '';
    };
}]);

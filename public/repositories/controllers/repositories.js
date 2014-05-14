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
            if (response.errors != undefined) {
                var errors = [];
                for (var property in response.errors) {
                    if (response.errors.hasOwnProperty(property)) {
                        errors.push(response.errors[property].message);
                    }
                }
                $scope.errors = errors;
            }
            else {
                $location.path('repositories/' + response._id);
            }
        });
    };

    $scope.findOne = function() {
        Repositories.get({
            repositoryId: $stateParams.repositoryId
        }, function(repository) {
            $scope.repository = repository;
            $scope.numberOfNamespaces = repository.commits[0].folders.length;
            var classes = repository.commits[0].folders.reduce(function(x,y) {
                x = x.concat(y.folders);
                return x; 
            }, []);
            $scope.numberOfClasses = classes.length; 
            $scope.classesWithBiggestLOC = classes.sort(function(a,b) {return b.info.linesOfCode - a.info.linesOfCode; }).slice(0,10);

            var methods = classes.reduce(function(x,y) {
                x = x.concat(y.files);
                return x;
            }, []);

            $scope.numberOfMethods = methods.length; 
            $scope.methodsWithBiggestLOC = methods.sort(function(a,b) {return b.info.linesOfCode - a.info.linesOfCode; }).slice(0,10);

        });
    };
}]);

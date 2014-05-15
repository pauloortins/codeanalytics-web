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
            
            var numberOfNamespaces = repository.commits[0].folders.length;
            
            var classes = repository.commits[0].folders.reduce(function(x,y) {
                x = x.concat(y.folders);
                return x; 
            }, []);

            var linesOfCode = classes.reduce(function(x,y) {return x + y.info.linesOfCode;},0);

            var numberOfClasses = classes.length; 

            var methods = classes.reduce(function(x,y) {
                x = x.concat(y.files);
                return x;
            }, []);
            
            var numberOfMethods = methods.length; 
            
            $scope.classesWithBiggestLOC = classes.sort(function(a,b) {return b.info.linesOfCode - a.info.linesOfCode; }).slice(0,10)
                .map(function(x) {return {name: x.info.name, value: x.info.linesOfCode};});
            
            $scope.methodsWithBiggestLOC = methods.sort(function(a,b) {return b.info.linesOfCode - a.info.linesOfCode; }).slice(0,10)
                .map(function(x) {return {name: x.info.name, value: x.info.linesOfCode};});
            
            $scope.basicInfo = [
                { name: "Lines of Code", value: linesOfCode},
                { name: "Namespace", value: numberOfNamespaces },
                { name: "Classes", value: numberOfClasses},
                { name: "Methods", value: numberOfMethods}
            ];
        });
    };
}]);

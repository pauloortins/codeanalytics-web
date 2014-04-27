'use strict';

(function() {
    // Repositories Controller Spec
    describe('MEAN controllers', function() {
        describe('RepositoriesController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var RepositoriesController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                RepositoriesController = $controller('RepositoriesController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one repository object ' +
                    'fetched from XHR', function() {

                        // test expected GET request
                        $httpBackend.expectGET('repositories').respond([{
                            name: 'name',
                            author: 'author',
                            url: 'repository.com'
                        }]);

                        // run controller
                        scope.find();
                        $httpBackend.flush();

                        // test scope value
                        expect(scope.repositories).toEqualData([{
                            name: 'name',
                            author: 'author',
                            url: 'repository.com'
                        }]);
            });
        });
    });
}());


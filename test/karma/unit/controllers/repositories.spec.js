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

            it('$scope.find() should create an array with at least one repository object ' +
                    'fetched from XHR', function() {

                        // test expected GET request
                        $httpBackend.expectGET('repositories').respond([{
                            name: 'repo',
                            author: 'paulo',
                            url: 'test@test.com'
                        }]);

                        // run controller
                        scope.find();
                        $httpBackend.flush();

                        // test scope value
                        expect(scope.repositories).toEqualData([{
                            name: 'repo',
                            author: 'paulo',
                            url: 'test@test.com'
                        }]);

                    });

            it('$scope.findOne() should create an array with one repository object fetched ' +
                    'from XHR using a repositoryId URL parameter', function() {
                        // fixture URL parament
                        $stateParams.repositoryId = '525a8422f6d0f87f0e407a33';

                        // fixture response object
                        var testRepositoryData = function() {
                            return {
                                name: 'repo',
                author: 'paulo',
                url: 'test@test.com'
                            };
                        };

                        // test expected GET request with response object
                        $httpBackend.expectGET(/repositories\/([0-9a-fA-F]{24})$/).respond(testRepositoryData());

                        // run controller
                        scope.findOne();
                        $httpBackend.flush();

                        // test scope value
                        expect(scope.repository).toEqualData(testRepositoryData());

                    });

            it('$scope.create() with valid form data should send a POST request ' +
                    'with the form input values and then ' +
                    'locate to new object URL', function() {

                        // fixture expected POST data
                        var postRepositoryData = function() {
                            return {
                                url: 'git@github.com:pauloortins/codeanalytics-web.git'
                            };
                        };

                        // fixture expected response data
                        var responseRepositoryData = function() {
                            return {
                                _id: '525cf20451979dea2c000001',
                url: 'git@github.com:pauloortins/codeanalytics-web.git'
                            };
                        };

                        // fixture mock form input values
                        scope.url = 'git@github.com:pauloortins/codeanalytics-web.git';

                        // test post request is sent
                        $httpBackend.expectPOST('repositories', postRepositoryData()).respond(responseRepositoryData());

                        // Run controller
                        scope.create();
                        $httpBackend.flush();

                        // test URL location to new object
                        expect($location.path()).toBe('/repositories/' + responseRepositoryData()._id);
                    });

            it('$scope.create() with invalid form data should send a POST request ' +
                    'with the form input values and then ' +
                    'locate to the same URL and ' + 
                    'show errors', function() {

                        // fixture expected POST data
                        var postRepositoryData = function() {
                            return {
                                url: 'git@github.com:pauloortins/codeanalytics-web.git'
                            };
                        };

                        // fixture expected response data
                        var responseRepositoryData = function() {
                            return {
                                errors: {
                                    url: {
                                        message:'Invalid'
                                    }
                                } 
                            };
                        };

                        // fixture mock form input values
                        scope.url = 'git@github.com:pauloortins/codeanalytics-web.git';

                        // test post request is sent
                        $httpBackend.expectPOST('repositories', postRepositoryData()).respond(responseRepositoryData());

                        // Run controller
                        scope.create();
                        $httpBackend.flush();

                        // test URL location to new object
                        expect($location.path()).toBe('');
                        expect(scope.errors[0]).toBe('Invalid');
                    });
        });
    });
}());


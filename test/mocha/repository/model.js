'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Repository = mongoose.model('Repository');

//Globals
var repository;

//The tests
describe('<Unit Test>', function() {
    describe('Model Repository:', function() {
        beforeEach(function(done) {
            repository = new Repository({
                url: 'https://github.com/pauloortins/codeanalytics-samples.git'
            });

            repository.save(done);
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return repository.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without url', function(done) {
                repository.url = '';

                return repository.save(function(err) {
                    should.exist(err);
                    done();
                });
            });


            it('should be able to show an error when try to save invalid url', function(done) {
                repository.url = 'testando';

                return repository.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            repository.remove();
            done();
        });
    });
});


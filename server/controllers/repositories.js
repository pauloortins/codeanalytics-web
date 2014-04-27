'use strict'

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Repository = mongoose.model('Repository'),
    _ = require('lodash');

/*
 * List of Articles
 */
exports.all = function(req, res) {
    Repository.find().exec(function(err, repositories) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(repositories);
        }
    });
};


exports.create = function(req, res) {
    var repository = new Repository(req.body);
    repository.user = req.user;

    repository.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                repository: repository
            });
        } else {
            res.jsonp(repository);
        }
    });
};

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

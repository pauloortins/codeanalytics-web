'use strict'

/**
 *  Module Dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Repository Schema
 */

var RepositorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
});

mongoose.model('Repository', RepositorySchema);

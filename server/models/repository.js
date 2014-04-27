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

/*
 * Hooks
 */
RepositorySchema.pre('save', function (next) {
    
    var self = this;

    if (self.url != undefined) {
        try {
            var extracted = self.url.match(/:.*\./)[0].replace(/[:,\.]/g,'')
            self.author = extracted.split('/')[0];
            self.name = extracted.split('/')[1];
        }
        catch(err) {
        }
    }

    next();
})

/**
 * Validations
 */
RepositorySchema.path('url').validate(function(url) {
    return url.length;
}, 'Url cannot be blank');


/*RepositorySchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

RepositorySchema.path('author').validate(function(author) {
    return author.length;
}, 'Author cannot be blank');*/

RepositorySchema.path('url').validate(function(url) {
    var regex = /git@github.com:.+\/.+.git/;
    return regex.test(url);
}, 'Url cannot be invalid');
mongoose.model('Repository', RepositorySchema);

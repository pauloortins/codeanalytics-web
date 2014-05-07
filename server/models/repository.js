'use strict'

/**
 *  Module Dependencies
 */
var mongoose = require('mongoose'),
    QueueItem = mongoose.model('QueueItem'),
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
            var array = self.url.split('/');
            self.author = array[array.length-2];
            self.name = array[array.length-1].replace('.git',''); 
        }
        catch(err) {
        }
    }

    next();
});

RepositorySchema.post('save', function (doc) {
    var item = new QueueItem({
        url: doc.url
    });
    
    console.log(doc);
    console.log(item);

    item.save(function(err){
        console.log(err);
    });
});

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

/**
 * Statics
 */
RepositorySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

RepositorySchema.path('url').validate(function(url) {
    var regex = /https:\/\/github.com\/.+\/.+.git/;
    return regex.test(url);
}, 'Url cannot be invalid');

mongoose.model('Repository', RepositorySchema);

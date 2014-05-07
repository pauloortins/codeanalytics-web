'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * QueueItem Schema
 */
var QueueItemSchema = new Schema({
    url: {
        type: String,
        default: ''
    }
}, { collection: 'queue' });

mongoose.model('QueueItem', QueueItemSchema);

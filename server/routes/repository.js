'use strict'

// Repositories routes use repositories controller
var repositories = require('../controllers/repositories')

module.exports = function(app) {
    app.get('/repositories', repositories.all);
};

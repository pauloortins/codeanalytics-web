'use strict'

// Repositories routes use repositories controller
var repositories = require('../controllers/repositories')

module.exports = function(app) {
    app.get('/repositories', repositories.all);
    app.post('/repositories', repositories.create);
    app.get('/repositories/:repositoryId', repositories.show);
    
    app.param('repositoryId', repositories.repository);
};

var main = require('./handlers/main.js');

module.exports = function (app) {

    app.get('/', main.home);

    app.get('/coaching', main.coaching);

    app.get('/training', main.training);

    app.get('/facilitation', main.facilitation);

    app.get('/contact', main.contact);


};
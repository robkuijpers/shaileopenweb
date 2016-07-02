/*
 * REST API user functions.
 */
var express = require('express');
var router = express.Router();

var userDB = require('../modules/fireBaseRepo');

/* Return an json array with users. */
router.get('/', function(req, res, next) {
    
    var users = [{
        'kuijpers2': 'Rob2'
    },{
        'kuijpersr': 'Robr'
    }];

    res.end( JSON.stringify(users));
});

/* Return an json array with users. */
router.get('/login', function(req, res, next) {
    
    // Retrieve payload, second parameter is default
    var username = req.param('username', null);    
    var password = req.param('password', null);

    // Access database.
    //var user = userDB.login(username, password);

    var user = {
        'name': username,
        'role': password
    }
    if(user) {
        res.end(JSON.stringify(user));
    } else {
        res.status(404).send('Not found');
    }

});

module.exports = router;

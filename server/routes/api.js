var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); 

router.get('/logout', function(req, res, next) {
  console.log('shaileopenweb: API.logout');
  res.status(204).send();
});

router.post('/login', function(req, res, next) {
  console.log('shaileopenweb: API.login');
  var credentials = req.body.credentials;    
  var username = credentials.username;    
  var password = credentials.password;
  console.log('User login:' + username);

  // Retrieve user from database
  // Check username / password
  // Generate jwt

  var user = {
    'firstName': 'Rob',
    'lastName': 'Kuijpers',
    'username': 'admin@admin',
    'role': 'admin'
  }

  if(username && password && username === user.username && password === 'admin') {
    
    // Generate jwt.
    var token = jwt.sign(user, 'secretkey', {
          expiresIn : 60*60*24  // expires in 24 hours
    });

    // Always wrap in toplevel element 'data'.
    var result = { 
      data: { 
        user: user, 
        token: token
      } 
    };
    res.send(JSON.stringify(result));
  } else {  
    var result = { 
      success: false, 
      message: 'User not found' 
    }
    res.status(404).send(result);
  }  
});

router.get('*', function(req, res, next) {
  res.send('API');
});


module.exports = router;
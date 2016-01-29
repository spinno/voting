var express = require('express');
var db = require('../db');
var _ = require('underscore');

console.log(db);

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function (req, res, next) { 
    res.render('login', { title: 'Logga in' });
});

router.post('/new', function (req, res, next) { 
    db.findOne({ name: 'allowed' }, function (err, doc) { 
        if(!err) {
            if(_(doc.allowed).contains(email)) {
                res.redirect('/');
            } else {
                res.redirect('/users/bad');
            }
        }
    });
    var email = req.body.email || "";
});

router.get('/bad', function (req, res, next) { 
    res.render('bad', { title: 'Fel' });
});

module.exports = router;

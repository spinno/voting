var express = require('express');
var db = require('../db');
var _ = require('underscore');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function (req, res, next) { 
    res.render('login', { title: 'Logga in' });
});

router.post('/new', function (req, res, next) { 

    var email = req.body.email || "";

    db.findOne({ name: 'allowed' }, function (err, doc) { 
        if(!err) {
            if(_(doc.allowed).contains(email)) {
                db.insert({
                    email: email,
                    voted: false
                }, function (err, doc) { 
                    res.cookie("user_id", doc._id, { maxAge: 3600*24 });
                    res.redirect('/');
                });

            } else {
                res.redirect('/users/bad');
            }
        }
    });
});

router.get('/bad', function (req, res, next) { 
    res.render('bad', { title: 'Fel' });
});

module.exports = router;

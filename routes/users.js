var express = require('express');
var db = require('../db');
var _ = require('underscore');

var router = express.Router();

router.get('/', function(req, res, next) {
    db.find({ email: { $exists: true } }, function (err, doc) { 
        if(err) {
            res.json(err);
        } else {
            res.json(doc);
        }
    });
});

router.get('/new', function (req, res, next) { 
    res.render('login', { title: 'Logga in' });
});

router.post('/new', function (req, res, next) { 

    var email = req.body.email || "";

    db.findOne({ email: email }, function (err, user) { 
        if(user && user.allowed) {
            res.cookie("user_id", user._id, { maxAge: 1000*3600*24 });
            res.redirect("/");
        } else {
            res.redirect("/users/bad");
        }
    });
});

router.get('/bad', function (req, res, next) { 
    res.render('bad', { title: 'Fel' });
});


router.put('/here', function (req, res, next) { 
    var email = req.body.email;
    var here = req.body.here;

    if(email) {
        if(here === "true") {
            db.update({ email: email }, { $set: { allowed: true } }, function () { 
                res.json({ success: true });
            });

        } else {
            db.update({ email: email }, { $set: { allowed: false } }, function () { 
                res.json({ success: true });
            });
        }
    } else {
        res.json({ err: "No email" });
    }
});

module.exports = router;

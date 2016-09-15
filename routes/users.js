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

router.get("/create", function (req, res, next) {

    if(req.cookies.user_id) {

        var id = req.cookies.user_id;

        db.findOne({ _id: id }, function (err, user) { 
            if(user && user.admin) {
                db.findOne({ active: true }, function (err, vote) { 
                    res.render('create', { title: "Create user" });
                });
            } else {
            res.render("/users/new");
            }
        });

    } else {
        res.render("/users/new");
    }
});

router.post('/create', function(req, res, next) {
    var email = req.body.email.toLowerCase();
    if(!email || email == "") res.json({ error: "Ingen email skickades" });
    else {

        db.insert({
            name: "Temp",
            email: email,
            allowed: true,
            admin: false,
            voted: false
        });

        res.redirect("/users/create");
    }
});

router.get('/new', function (req, res, next) { 
    res.render('login', { title: 'Logga in' });
});

router.post('/new', function (req, res, next) { 

    var email = (req.body.email || "").toLowerCase();

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
    var email = (req.body.email || "").toLowerCase();
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

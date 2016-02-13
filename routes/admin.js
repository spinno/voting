var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('underscore');

router.get('/', function (req, res, next) { 

    if(req.cookies.user_id) {

        var id = req.cookies.user_id;

        db.findOne({ _id: id }, function (err, user) { 
            if(user && user.admin) {
                db.findOne({ active: true }, function (err, vote) { 

                    res.render('admin', { 
                        title: "Admin page", 
                        activeVote: vote
                    });
                });
            } else {
                res.redirect("/users/new");
            }
        });

    } else {
        res.redirect("/users/new");
    }

});

router.get('/here', function (req, res, next) { 
    if(req.cookies.user_id) {
        db.findOne({ _id: req.cookies.user_id }, function (err, user) { 
            if(user && user.admin) {
                db.find({ email: { $exists: true } }, function (err, users) { 
                    if(users)
                        res.render('here', { title: "Här", users: users });
                    else
                        res.render('here', { title: "ERROR", users: [] });
                });
            } else {
                res.redirect("/users/new");
            }
        });
    } else {
        res.redirect("/users/new");
    }
});

module.exports = router;

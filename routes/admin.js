var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('underscore');

router.get('/', function (req, res, next) { 

    if(req.cookies.user_id) {

        var id = req.cookies.user_id;

        db.findOne({ _id: id }, function (err, user) { 
            if(!err && user) {
                db.findOne({ name: 'admins' }, function (err, doc) { 
                    if(!err) {
                        if(!_(doc.admins).contains(user.email)) {
                            res.redirect('/users/bad');
                        } else {

                            db.findOne({ active: true }, function (err, vote) { 

                                res.render('admin', { 
                                    title: "Admin page", 
                                    activeVote: vote
                                });
                            });
                        }
                    }
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
            if(user) {
            if(!err) {
                db.findOne({ name: "admins" }, function (err, doc) { 
                    if(!err) {
                        if(!_(doc.admins).contains(user.email)) {
                            res.redirect("/users/bad");
                        } else {
                            db.findOne({ name: "users" }, function (err, users) { 
                                db.findOne({ name: "allowed" }, function (err, allowed) { 
                                    var userList = users.users.map(function (u) { 
                                        u.here = _(allowed.allowed).contains(u.email);
                                        return u;
                                    });

                                    res.render('here', { title: "Här", users: userList });
                                });
                            });
                        }
                    }
                });
            }
            } else {
                res.redirect("/users/new");
            }
        });
    } else {
        res.redirect("/users/new");
    }
});

module.exports = router;

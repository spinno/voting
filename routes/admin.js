var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('underscore');

router.get('/', function (req, res, next) { 

    // if(req.cookies.user_id) {

        var id = req.cookies.user_id;

        db.findOne({ _id: id }, function (err, user) { 
            if(!err) {
                db.findOne({ name: 'admins' }, function (err, doc) { 
                    if(!err) {
                        // if(!_(doc.admins).contains(user.email)) {
                            // res.redirect('/users/bad');
                        // } else {
                         
                        db.findOne({ active: true }, function (err, vote) { 

                                res.render('admin', { 
                                    title: "Admin page", 
                                    activeVote: vote
                                });
                            });
                        // }
                    }
                });
            }
        });


    // } else {
    //     res.redirect("/users/new");
    // }
});

module.exports = router;

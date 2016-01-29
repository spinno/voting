var express = require('express');
var db = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) { 
    var _id = req.cookies.user_id;

    db.findOne({ _id: _id }, function (err, user) { 
        if(!err && user) {
            var email = user.email || "";
            res.render("index", { email: email });
        } else {
            res.redirect('/users/new');
        }
    });
    
});

module.exports = router;

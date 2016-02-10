var DataStore = require('nedb'),
    db = new DataStore();

var members = require('./members.json');

var options = [];
var allowed = ["adamlew@kth.se"];
var admins = ["adamlew@kth.se"];

var users = members.users.map(function (user) { 

    var admin = false, allowed = false;

    if(user.email === "adamlew@kth.se") {
        admin = true;
        allowed = true;
    } else {
    }

    return {
        name: user.name,
        email: user.email,
        allowed: allowed,
        admin: admin,
        voted: false
    };
});

db.insert(users);

db.insert({ 
    votes: 0,
    active: true, 
    options: [{ text: "Adam", votes: 0 }, { text: "Annat", votes: 0 }] 
});

module.exports = db;

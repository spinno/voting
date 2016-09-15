db = require('./db.js');

var members = require('./members.json');

var users = members.users.map(function (user) { 

    var admin = false, allowed = false;

    if(user.email === "adamlew@kth.se" || user.email === "joakiml4@kth.se") {
        admin = true;
        allowed = true;
    } else {
    }

    return {
        name: user.name,
        email: user.email.toLowerCase(),
        allowed: allowed,
        admin: admin,
        voted: false
    };
});

db.insert(users);

db.insert({ 
    votes: 0,
    active: true, 
    options: [{ text: "Jocke", votes: 0 }, { text: "Annat", votes: 0 }] 
});

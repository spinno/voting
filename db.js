var DataStore = require('nedb'),
    db = new DataStore();

var options = [];
var allowed = ["adamlew@kth.se"];
var admins = ["adamlew@kth.se"];

db.insert({ 
    votes: 0,
    active: true, 
    options: [{ text: "Adam", votes: 0 }, { text: "Annat", votes: 0 }] 
});

db.insert({ name: 'allowed', allowed: ["adamlew@kth.se"] }); 
db.insert({ name: 'admins', admins: ["adamlew@kth.se"] });

module.exports = db;

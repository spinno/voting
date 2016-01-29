var DataStore = require('nedb'),
    db = new DataStore();

var options = [];
var allowed = ["adamlew@kth.se"];

db.insert({ name: 'allowed', allowed: ["adamlew@kth.se"] }); 

module.exports = db;

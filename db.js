var DataStore = require('nedb'),
    db = new DataStore({
        filename: "database.db",
        autoload: true
    });


module.exports = db;

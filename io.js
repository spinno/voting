var db = require('./db.js');
var users = 0;
var onNewSocket = [];

module.exports = {
    load: function (server) { 
        console.log("initialize IO");
        io = require('socket.io')(server);
        server.listen(3000);

        io.on('connection', function (socket) { 
            users += 1;
            // console.log("A user connected (" + users + ")");
            onNewSocket.forEach(function (fn) { 
                fn(socket);
            });

            socket.on('disconnect', function () { 
                users -= 1;
                // console.log("A user disconnected (" + users + ")");
            });

            socket.on('vote', function (msg) { 
                var query = {};
                query["stats."+msg.id] = 1;
                query["votes"] = 1;


                db.update({ _id: msg.user }, { $set: { voted: true } });
                db.update({ active: true }, { $inc: query }, function () { 

                    socket.emit('wait', {});
                    db.findOne({ active: true }, function (err, doc) { 
                        socket.to("admin").emit("admin-speed", {
                            error: err,
                            vote: doc
                        });
                    });
                });
                
            });

            socket.on("voting", function (msg) { 
                socket.join("voting");
            });

            socket.on('admin-hook', function (msg) { 
                socket.join("admin");
                db.findOne({ active: true }, function (err, vote) { 
                    if(!vote) err = true;
                    socket.emit("admin-speed", {
                        error: err,
                        vote: vote
                    });
                });

            });

            socket.on('stop-vote', function () { 
                db.update({ voted: true }, { $set: { voted: false } }, { multi: true });
                db.update({ active: true }, { $set: { active: false } }, { multi: true }, function () { 
                    socket.emit('admin-speed', { error: true });
                    socket.to("voting").emit("wait", {});
                });

            });

            socket.on('start-vote', function (msg) { 
                var options = msg.options.map(function(o) { 
                    return { text: o, votes: 0 }; 
                });

                var doc = { active: true, votes: 0, options: options };
                db.insert(doc, function (err) { 
                    socket.emit('admin-speed', {
                        error: err,
                        vote: doc
                    });

                    socket.to("voting").emit('start', {
                        error: err,
                        vote: doc
                    });
                });

            });

        });
    },

    bindSocket: function (fn) { 
        onNewSocket.push(fn);
    }
};

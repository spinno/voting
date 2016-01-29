var express = require('express');
var app = express();

var ioServer = require('http').createServer(app);
var io = require('socket.io')(ioServer);

io.on('connection', function () { });

app.get('/', function (req, res) { 
    res.send("hello world");
});

ioServer.listen(3000, function () { 
    console.log("Listening on port 3000");
});

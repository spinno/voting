var socket = io();

$(function () { 
    $("#vote").submit(function (event) { 
        event.preventDefault();
        var request = {};
        var serialized = $(this).serializeArray();
        for(data of serialized) {
            request[data.name] = data.value;
        }

        socket.emit('vote', { id: request["option"] });
    });
});

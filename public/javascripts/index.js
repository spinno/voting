var socket = io();

$(function () { 
    socket.emit("voting", {});

    socket.on('wait', function (msg) { 
        $(".vote").addClass("hidden");
        $(".wait").removeClass("hidden");
        $(".wait h1").html("Tack för din röst!");
    });

    socket.on("start", function (msg) { 
        window.location.reload();
    });

    $("#vote").submit(function (event) { 
        event.preventDefault();
        var request = {};
        var serialized = $(this).serializeArray();
        for(data of serialized) {
            request[data.name] = data.value;
        }

        socket.emit('vote', { id: request["option"], user: Cookies.get("user_id") });
    });
});

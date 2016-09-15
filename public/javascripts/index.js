var socket = io();

function vote() {
    var request = {};
    var serialized = $("#vote").serializeArray();
    for(data of serialized) {
        request[data.name] = data.value;
    }

    if(data.value == -1) {
        alert("Du måste välja ett alternativ");
    } else {
        socket.emit('vote', { id: request["option"], user: Cookies.get("user_id") });
    }

}

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

    $(".vote-btn").on('click', function (event) { 
        vote();
        return false;
    });
});

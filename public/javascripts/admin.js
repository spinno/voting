var socket = io();

var index = 0;

function addOption() {
    var $div = $("<div/>");
    var $input = $("<input type='text' name='"+ index++ +"' />");
    var $btn = $("<div class='btn btn-primary remove'>Ta bort</div>")
    .click(function () { 
        $div.remove();
    });

    $div.append($input, $btn, "<br/>");
    $("#fields").append($div);
}

function setVote(vote) { 
    var stats = vote.stats || {};
    $(".display-results").html("");
    vote.options.forEach(function (option,i) { 
        var percent = (((stats[i] || 0) / vote.votes) || 0) * 100;
        $(".display-results").append(
            "<span>"+option.text+" - </span><span class='votes'>"+stats[i]+"</span>"+
            "<div class='progress' >"+
                "<div style='width:"+percent+"%' class='progress-bar'"+
                "role='progressbar'"+
                "<span class='sr-only'>"+percent.toFixed(1)+"%</span>"+
                    "</div></div><br/>"
        );
    });
}

$(function () { 
    socket.on("admin-speed", function (msg) { 
        if(msg.error) {
            $(".active").addClass("hidden");
            $(".inactive").removeClass("hidden");
            $("#fields").html("");
            index = 0;
        } else {
            $(".inactive").addClass("hidden");
            $(".active").removeClass("hidden");
            setVote(msg.vote);
        }
    });

    socket.emit("admin-hook", {});

    $("#add").click(function () { 
        addOption();
    });

    $(".stop-btn").click(function () { 
        socket.emit("stop-vote");
    });

    $("#start-vote").submit(function (event) { 
        event.preventDefault();
        var request = [];
        var serialized = $(this).serializeArray();
        for(data of serialized) {
            request[data.name] = data.value;
        }

        socket.emit("start-vote", {
            options: request
        });
    });
});

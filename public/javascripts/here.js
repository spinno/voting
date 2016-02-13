$(function () { 

    var users;

    $.get("/users", function (data) { 
        users = new Fuse(data, {
            keys: ["name", "email"],
            id: 'email',
            threshold: 0.3
        });
    });


    $(".active").click(function () { 
        var main = this;
        var email = $(this).attr("data-user");
        var here = $(this).attr("data-here") == "true";

        $.ajax({
            method: "put",
            url: "/users/here/",
            data: {
                email: email, here: !here
            },

            success: function (data) { 
                $(main).attr("data-here", here ? "false" : "true");
                $(main).html(here ? "Ej närvarande" : "Närvarande");
                if(!here) {
                    $(main).addClass("here").removeClass("not-here");
                } else {
                    $(main).addClass("not-here").removeClass("here");
                }
            }
        });
    });

    $(".search").on('change', function () { 
        var value = $(this).val();
        var emails = users.search(value);
        var i = 0;
        $("tr").each(function () { 
            if(i > 50) return;
            if(_(emails).contains($(this).attr("data-user"))) {
                i++
                $(this).removeClass("hidden");
            } else {
                $(this).addClass("hidden");
            }

        });
    });
});

/*page jump func*/
function login_jump(uid, psw) {
    let success = false;
    /*cz's check*/
    console.log("uid:", uid);
    console.log("psw:", psw);
    if (uid === "" || uid == null) {
        alert("user id can't be empty!");
        return;
    }
    let str = uid;
    for (var i = 0; i < str.length; i += 1) {
        if (!((str[i] >= '0' && str[i] <= '9') || (str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z'))) {
            alert("you can only input characters among 0-9, a-z, A-Z.");
            return;
        }
    }
    if (psw === "" || psw == null) {
        alert("password can't be empty!");
        return;
    }
    str = psw;
    for (var i = 0; i < str.length; i += 1) {
        if (!((str[i] >= '0' && str[i] <= '9') || (str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z'))) {
            alert("you can only input characters among 0-9, a-z, A-Z.");
            return;
        }
    }

    $.ajax({
        url: "../php/login.php",
        type: "POST",
        dataType: "json",
        data: {
            "uid": uid,
            "psw": psw,
        },
        error: function () {
            alert('request-error when login...');
        },
        processData: true,
        complete: function () {
            console.log("executing finished!");
        },
        success: function (data) {
            console.log(data);
            let success = data["status"];
            let head = data["head"];
            console.log(success);
            if (success) {
                setCookie("uid", uid, 30);
                setCookie("psw", psw, 30);
                setCookie("head", head, 30);
                setCookie("name", data["name"], 30);
                console.log("type:", data["type"]);

                if (data["type"] === "0") {
                    setCookie("type", "admin", 30);
                } else if (data["type"] === "1") {
                    setCookie("type", "teacher", 30);
                } else {
                    setCookie("type", "student", 30);
                }

                if (data["type"] === "0") {
                    /*admin*/
                    window.location.href = "./Admin_Dashboard.html";
                } else {
                    /*t&s*/
                    window.location.href = "./Dashboard.html";
                }
            } else{
                alert("Wrong password or user id do not exist!");
            }
        }
    });
}

/*login func*/
function login() {
    $("#sign-in-btn").on("click", function () {
        var uid = document.getElementById("uid");
        var psw = document.getElementById("psw");
        login_jump(uid.value, psw.value);
    });
}

/*check cookie*/
function login_check_cookie() {
    // let uid=getCookie("uid");
    // let psw=getCookie("psw");
    // // console.log(uid);
    // // console.log(psw);

    // if(uid!="")
    //    login_jump(uid,psw);
    // else {
    //     console.log("no cookie!");
    // }
}
/*sign in old func*/
function sign_in() {
    // var uid = document.getElementById("uid");
    // var psw = document.getElementById("psw");
    // login_jump(uid.value, psw.value);
}
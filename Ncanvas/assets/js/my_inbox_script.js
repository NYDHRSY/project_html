
/*render Mail list*/
function renderMailList(data_url) {
    data_url = "../php/load_Inbox.php";
    load_box();
    function load_box() {
        var uid = getCookie("uid");

        $.ajax({
            url: data_url,
            type: "POST",
            dataType: "json",
            data: {
                "uid": uid
            },
            error: function () {
                alert('request error!发送失败');
            },
            complete: function () {
                console.log("executing finished!");
            },
            success: function (data) {//如果调用php成功
                console.log(data);
                createMailList(data);
            }
        });
        function createMailList(data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    let mail = data[i];
                    let head = mail['head'];
                    let name = mail['name'];
                    let time = mail['time'];
                    let title = mail['title'];
                    let content = mail['content'];
                    let from_uid = mail['uid_ano'];

                    $("#mail-list").append("" +
                        "<li class=\"list-group-item mail-item\">" +
                        "    <a id=\"from-" + from_uid + "\" href=\"Inbox_view.html\" class='detail-link'>" +
                        "<!--hidden-->" +
                        "<div class='d-none hid-mail'>" +
                        "<span class='head'>" + head + "</span>" +
                        "<span class='name'>" + name + "</span>" +
                        "<span class='time'>" + time + "</span>" +
                        "<span class='title'>" + title + "</span>" +
                        "<span class='content'>" + content + "</span>" +
                        "<span class='from_uid'>" + from_uid + "</span>" +
                        "</div>" +
                        "        <!-- mail -->" +
                        "        <div class=\"media align-items-center w-100\">" +
                        "            <!--mail head-->" +
                        "            <div class=\"avatar rounded-circle flex-grow-0 mail-head\" style=\"overflow: hidden;\">" +
                        "                <img alt=\"" + name + "\" src=\"" + head + "\">" +
                        "            </div>" +
                        "            <!--mail body-->" +
                        "            <div class=\"ml-2 overflow-hidden flex-grow-1 mail-body\">" +
                        "                <!--mail info-->" +
                        "                <div class=\"d-flex align-items-center justify-content-between mail-info-row\">" +
                        "                    <span class=\"font-weight-bold text-teal user-name\">" + name + "</span>" +
                        "                    <span class=\"text-xs text-gray time\">" + time + "</span>" +
                        "                </div>" +
                        "                <!--divider-->" +
                        "                <hr class=\"my-1\">" +
                        "                <!--mail content-->" +
                        "                <div class=\"d-flex align-items-center mail-content-row\">" +
                        "                    <span class=\"mb-0 p-0 font-weight-bold text-default text-capitalize text-nowrap mail-subject\">" + title + "</span>" +
                        "                    <span class=\"ml-2 mb-0 p-0 text-default mail-content\">" + content + "</span>" +
                        "                </div>" +
                        "            </div>" +
                        "        </div>" +
                        "    </a>" +
                        "</li>"
                    );
                }
            }
            $(".detail-link").on("click", function () {
                let mail = {
                    "head": $(this).find(".hid-mail .head")[0].innerText,
                    "name": $(this).find(".hid-mail .name")[0].innerText,
                    "time": $(this).find(".hid-mail .time")[0].innerText,
                    "title": $(this).find(".hid-mail .title")[0].innerText,
                    "content": $(this).find(".hid-mail .content")[0].innerText,
                    "from_uid": $(this).find(".hid-mail .from_uid")[0].innerText
                };
                console.log(mail);

                setCookie("mail", JSON.stringify(mail), 1);
            });
        }
    }
}

/*render mail detail*/
function renderMailDetail() {
    createMailDetail();
    function createMailDetail() {
        let mail = JSON.parse(getCookie('mail'));
        let name = mail['name'];
        let head = mail['head'];
        let time = mail['time'];
        let title = mail['title'];
        let content = mail['content'];
        let from_uid = mail['from_uid'];

        $("#mail-detail-container").append("" +
            "<!-- mail -->" +
            "<div class=\"media align-items-center w-100 mail-head-row\">" +
            "    <!--mail head-->" +
            "    <div class=\"avatar rounded-circle flex-grow-0 mail-head\" style=\"overflow: hidden;\">" +
            "        <img alt=\"" + name + "\" src=\"" + head + "\"></div>" +
            "    <!--mail body-->" +
            "    <div class=\"ml-2 overflow-hidden flex-grow-1 \">" +
            "        <!--mail info-->" +
            "        <div class=\"d-flex align-items-center justify-content-between mail-info-row\">" +
            "            <span class=\"font-weight-bold text-teal user-name\" title=\"UID : " + from_uid + "\">" + name + "</span>" +
            "            <span class=\"text-xs text-gray time\">" + time + "</span>" +
            "        </div>" +
            "        <!--divider-->" +
            "        <hr class=\"my-1\">" +
            "        <!--mail sub-->" +
            "        <div class=\"d-flex align-items-center mail-content-row\">" +
            "            <span class=\"mb-0 p-0 font-weight-bold text-capitalize text-nowrap mail-subject\">" + title + "</span>" +
            "        </div>" +
            "    </div>" +
            "</div>" +
            "<hr class=\"my-2\">" +
            "<!--mail content-->" +
            "<div class=\"mx-3 mt-3 align-items-center mail-content-row\" >" +
            "    <p class=\"mail-content\">" +
            content +
            "    </p>" +
            "</div>"
        );
    }
}


function send(sub_url) {
    sub_url = "../php/send_Inbox.php";
    var uid = getCookie("uid");
    //czcz
    if (uid == null || uid == "") {
        alert("you don't have the uid's cookie!");
        window.location.href = "./index.html";
        return;
    }
    var uid_ano = document.getElementById("to").value;
    var title = document.getElementById("subject").value;
    var content = document.getElementById("textarea").value;

    if (uid_ano == "" || uid_ano == null) {
        alert("The other's user id can't be empty!");
        return;
    }

    for (var i = 0; i < uid_ano.length; i += 1) {
        if (uid_ano[i] === '\'') {
            alert("you can't input \'");
            return;
        }
    }
    if (title === "" || title == null) {
        alert("The title can't be empty!");
        return;
    }
    for (var i = 0; i < title.length; i += 1) {
        if (title[i] === '\'') {
            alert("you can't input \'");
            return;
        }
    }
    if (content === "" || content == null) {
        alert("The content can't be empty!");
        return;
    }
    for (var i = 0; i < content.length; i += 1) {
        if (content[i] === '\'') {
            alert("you can't input \'");
            return;
        }
    }
    //php
    $.ajax({
        url: sub_url,
        type: "POST",
        dataType: "json",
        data: {
            "uid": uid,
            "uid_ano": uid_ano,
            "head": getCookie('head'),
            "title": title,
            "content": content
        },
        error: function () {
            alert('request error!发送失败');
        },
        processData: true,
        complete: function () {
            console.log("executing finished!");
        },
        success: function (data) {//如果调用php成功
            console.log("data.status:");
            console.log(data.status);
            if (data["status"] == 1) {
                // alert("发送成功!");
                window.location.href="Inbox.html";
            } else
                alert("发送失败!");
        }
    });
}

// function GetRequest() {//Inbox_view.html body onload时用到
//     var name = document.getElementById("name");
//     name.innerText = getCookie("i_name");
//
//
//     var uid = document.getElementById("uid");
//     uid.innerText = " " + getCookie("i_uid") + " ";
//     var title = document.getElementById("title");
//     title.innerText = getCookie("i_title");
//
//     var time = document.getElementById("time");
//     time.innerText = getCookie("i_time");
//     var content = document.getElementById("content");
//     content.innerText = getCookie("i_content");
//
//     //czcz
//     var cname = getCookie("i_name");
//     if (cname == null || cname == "") {
//         alert("you don't have the name's cookie!");
//         window.location.href = "./index.html";
//         return;
//     }
//     var cuid = getCookie("i_uid");
//     if (cuid == null || cuid == "") {
//         alert("you don't have the uid's cookie!");
//         window.location.href = "./index.html";
//         return;
//     }
//     var ctitle = getCookie("i_title");
//     if (ctitle == null || ctitle == "") {
//         alert("you don't have the title's cookie!");
//         window.location.href = "./index.html";
//         return;
//     }
//     var ctime = getCookie("i_time");
//     if (ctime == null || ctime == "") {
//         alert("you don't have the time's cookie!");
//         window.location.href = "./index.html";
//         return;
//     }
//     var ccontent = getCookie("i_content");
//     if (ccontent == null || ccontent == "") {
//         alert("you don't have the content's cookie!");
//         window.location.href = "./index.html";
//         return;
//     }
//
// }
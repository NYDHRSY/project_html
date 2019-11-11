/*render the discussion*/
function renderDiscussion(data_url,sub_url) {
    data_url="../php/load_discussion.php";
    sub_url = "../php/submit_discussion.php";
    load_discussion();
    $("#submit_content").on('click',function () {
        let uid = getCookie("uid");//uid
        let cid = getCookie("cid");
        let content = document.getElementById("input_words").value;
        if (content === "" || content == null) {
            alert("content can't be emtpy!");
            return;
        }
        for (var i = 0; i < content.length; i += 1) {
            if (content[i] === '\'') {
                alert("you can't input \'");
                return;
            }
        }
        $.ajax({
            url: sub_url,
            async: true,
            type: "POST",
            dataType: "json",
            data: {
                "uid": uid,
                "cid": cid,
                "content": content,
                //"name":name
            },
            error: function () {
                alert('发送请求失败——give discussion');
            },
            processData: true,
            complete: function () {
                console.log("success for sending discussion!");
            },
            success: function (res) {
                console.log("res:", res);
                let success = res["status"];
                if (success == 1) {//success!
                    alert("Submited");
                    window.location.reload();//刷新页面，获取新的评论。
                } else {
                    alert("Something went wrong while submitting, please refresh and try again! (Ctrl + F5)");
                }
            }
        });
    });
    function load_discussion() {
        let cid = getCookie("cid");

        $.ajax({
            url: data_url,
            type: "POST",
            dataType: "json",
            data: {
                "cid": cid
            },
            error: function () {
                alert('Connection error!');
            },
            processData: true,
            complete: function () {
                console.log("executing finished!");
            },
            success: function (data) {//如果调用php成功
                console.log("data:", data);
                createDiscussion(data);
            }
        });
    }
    function createDiscussion(data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                let comment = data[i];
                let head = comment['head'];
                let name = comment['name'];
                let time = comment['time'];
                let content = comment['content'];
                $("#list_group").append("" +
                    "<li class=\"list-group-item comment-item\">\n" +
                    "    <!--comment header-->\n" +
                    "    <div class=\"d-flex align-items-center justify-content-between comment-item-header\">\n" +
                    "        <div class=\"media align-items-center\">\n" +
                    "            <span class=\"avatar avatar-sm rounded-circle\" style=\"overflow: hidden\">\n" +
                    "                <img alt=\""+ name +"\" src=\""+ head +"\">\n" +
                    "            </span>\n" +
                    "            <div class=\"media-body ml-2\">\n" +
                    "                <span class=\"mb-0 text-purple user-name\">"+ name +" : </span>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <span class=\"text-sm text-gray time\">"+ time +"</span>\n" +
                    "    </div>\n" +
                    "    <!--divider-->\n" +
                    "    <hr class=\"my-2\">\n" +
                    "    <!--comment content-->\n" +
                    "    <div class=\"comment-item-content\">\n" +
                    "        <span>"+ content +"</span>\n" +
                    "    </div>\n" +
                    "</li>"
                );
            }
        }
    }
}
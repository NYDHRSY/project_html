function load_discussion(){//sign in按钮启动时用到
    let cid=getCookie("cid");
    if (cid==""||cid==null) { cid=9901};//cid

    $.ajax({
        url: "../cz/php_cz/load_discussion.php",
        type: "POST",
        dataType:"json",
        data:{
            "cid":cid
        },
        error: function(){
            alert('发送请求失败——discussion');
        },
        processData:true,
        complete:function()
        {
            console.log("executing finished!");
        },
        success: function(data){//如果调用php成功
            console.log("data:",data);
            //var json_data=JSON.parse(data);
            createNewEleOfDis(data);
        }
    });
}

function createNewEleOfDis(json_data) {
    var element = document.getElementById("discussion");
    for (var i = 0; i < json_data.length; i++) {
        var wrapper = document.createElement("div");
        var wrapper_sub1 = document.createElement("div");
        var people = json_data[i]["name"];
        //people=people.strong();
        var time = json_data[i]["time"];
        //var str=people+" "+time;
        var span_people = document.createElement("span");
        var node_people = document.createTextNode(people);
        span_people.appendChild(node_people)
        span_people.style.fontSize = "larger"
        span_people.setAttribute("class","user");
        wrapper_sub1.appendChild(span_people);

        // var node_space = document.createTextNode("  ");
        // wrapper_sub1.appendChild(node_space);

        var node_time = document.createTextNode(time);
        var span_time = document.createElement("span");
        span_time.appendChild(node_time);
        span_time.style.fontSize = "small";
        span_time.setAttribute("class","time");
        wrapper_sub1.appendChild(span_time);

        var wrapper_sub2 = document.createElement("div");
        var node_cont = document.createTextNode(json_data[i]["content"]);

        wrapper_sub2.appendChild(node_cont);
        wrapper.appendChild(wrapper_sub1);
        var hr=document.createElement("hr");
        wrapper.appendChild(hr);
        wrapper.appendChild(wrapper_sub2);
        element.appendChild(wrapper);
    }
}
function submit_discussion(){
    let uid=getCookie("uid");//uid
    let cid=getCookie("cid");
    //let name=getCookie("name");
    let content=document.getElementById("input_words").value;
    if (uid==""||uid==null) { uid=21161626};//uid cqz
    if (cid==""||cid==null) { cid=9901};//cid
    $.ajax({
        url:"../cz/php_cz/send_discussion.php",
        async:true,
        type: "POST",
        dataType:"json",
        data:{
            "uid":uid,
            "cid":cid,
            "content":content,
            //"name":name
        },
        error: function(){
            alert('发送请求失败——give discussion');
        },
        processData:true,
        complete:function()
        {
            console.log("success for sending discussion!");
        },
        success:function(res){
            console.log("res:",res);
            //var json_data=JSON.parse(res);
            //json_data=json_data[0];
            //let success=res.status;
            let success=res["status"];
            if(success==1){//success!
                alert("留言成功");
                window.location.reload();//刷新页面，获取新的评论。//??
            }
            else {
                alert("留言失败！");
            }
        }
    });
}



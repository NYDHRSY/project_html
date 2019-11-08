
function renderAdminUserlist() {//cz
    var head = "../assets/file/cxk.jpg";
    var namelist = ["name","uid","psw","type"];
    var json_list = [];
    $.ajax({
        url: "../cz/php_cz/load_user_list.php",
        type: "POST",
        dataType:"json",
        error: function(){
            alert('request error!发送失败');
        },
        data:{

        },
        complete:function()
        {
            console.log("executing finished!");
        },
        success: function(data){//如果调用php成功
            createUserList(data);
        }
    });
    function createUserList(data) {
        console.log("load!");
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let user = data[i];
                let ulname = user.name;
                let ulhead = head;
                let uluid = user.uid;
                let ulpsw = user.psw;
                let ultype = user.type;
                let user_list = [];
                user_list.push("" +
                    "<tr id=\""+ uluid +"-row\">\n" +
                    "    <th scope=\"row\" class=\"name\">\n" +
                    "        <div class=\"media align-items-center\">\n" +
                    "            <a href=\"#\" class=\"avatar rounded-circle mr-1\">\n" +
                    "                <img alt=\""+ulname+"\" src=\""+ulhead+"\">\n" +
                    "            </a>\n" +
                    "            <div class=\"media-body\">\n" +
                    "                <span class=\"mb-0 text-sm my-editable\">"+ulname+"</span>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </th>\n" +
                    "    <td class=\"user-id my-editable\">\n" +
                    uluid+
                    "    </td>\n" +
                    "    <td class=\"password my-editable\">\n" +
                    ulpsw+
                    "    </td>\n" +
                    "    <td class=\"type my-editable\">\n" +
                    ultype+
                    "    </td>\n" +
                    "    <td class=\"edit-container\">\n" +
                    "        <button id=\""+uluid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "        <button id=\""+uluid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "    </td>\n" +
                    "</tr>"
                );
                $("#user-list-add-btn-row").before(user_list);
            }
        }

        /*全局设定*/
        $("#user-list-form .my-edt-btn").on("click",function () {

            let id = this.id.slice(0,-8);
            console.log(id);
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                    );
                });
                $("#"+id+"-row input[name='uid']").attr("readonly",true);
                $("#"+id+"-row input[name='type']").attr("readonly",true);
                $("#"+id+"-row .my-del-btn").hide();
                $(this).html("Save").toggleClass("bg-orange");
            }
            else {
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    let input = item.children[0];
                    json[input.getAttribute("name")] = input.value;
                });
                let flag = 1;
                for(var i in json_list){
                    if (json_list.hasOwnProperty(i)){
                        let tmp = json_list[i];
                        if(json.uid===tmp.uid){
                            json_list.splice(parseInt(i),1,json);
                            flag = 0;
                            break;
                        }
                    }
                }
                if(flag){
                    json_list.push(json);
                }
                console.log("edit!");
                $.ajax({
                    url:"../cz/php_cz/edit_user.php",
                    type:"POST",
                    data:json,
                    // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                    success:function(data){
                        alert("success");
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        //data=JSON.parse(data);//cqz
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be deleted ,please try again later");
                    }
                });
                console.log(json);
                console.log(json_list);
                // $(this).html("Edit").toggleClass("bg-orange");
            }
        });
        $("#user-list-form .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            let json = {};
            $.each($("#"+id+"-row .my-editable"), function (i, item) {
                json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
            });
            for(var i in json_list){
                if (json_list.hasOwnProperty(i)){
                    let tmp = json_list[i];
                    if(json.uid===tmp.uid){
                        json_list.splice(parseInt(i),1);
                        break;
                    }
                }
            }
            console.log("json:",json);
            console.log("delete_1!");
            $.ajax({
                url:"../cz/php_cz/del_user.php",
                type:"POST",
                data:json,
                //contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                success:function(data){
                    //data=JSON.parse(data);
                    alert("success");
                    $("#"+id+"-row").remove();
                    console.log("status:",data["status"]);
                },
                error:function(){
                    alert("Connection error, please try again later");
                }
            });
            console.log(json);
            console.log(json_list);
        });
        $("#user-list-add-btn").on("click",function () {
            $("#user-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <div class=\"media align-items-center\">\n" +
                "            <a href=\"#\" class=\"avatar rounded-circle mr-1\">\n" +
                "                <img alt=\"new\" src=\"../assets/file/cxk.gif\">\n" +
                "            </a>\n" +
                "            <div class=\"media-body\">\n" +
                "                <span class=\"mb-0 text-sm my-editable\"><input type=\"text\" name=\"name\" class=\"text\"></span>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </th>\n" +
                "    <td class=\"user-id my-editable\"><input type=\"text\" name=\"uid\" class=\"text\"></td>\n" +
                "    <td class=\"password my-editable\"><input type=\"text\" name=\"psw\" class=\"text\"></td>\n" +
                "    <td class=\"type my-editable\"><input type=\"text\" name=\"type\" class=\"text\"></td>\n" +
                "    <td class=\"edit-container\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>"
            );
            let newRow = $("#new-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                for(var i in json_list){
                    if (json_list.hasOwnProperty(i)){
                        let tmp = json_list[i];
                        if(json.uid===tmp.uid){
                            json_list.splice(parseInt(i),1);
                            break;
                        }
                    }
                }
                //console.log(json.uid);
                console.log("delete_2 in adder!");
                $.ajax({
                    url:"../cz/php_cz/del_user.php",
                    type:"POST",
                    data:json,
                    // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        // $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        // $("#"+id+"-row .my-del-btn").show();
                        //data=JSON.parse(data);
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
                console.log(json);
                console.log(json_list);
                // $(this).html("Edit").toggleClass("bg-orange");
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='uid']")[0].value;
                newRow.attr("id",""+id+"-row");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);
                newSaveBtn.off("click");
                {

                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='uid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        let json = {};
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        let flag = 1;
                        for(var i in json_list){
                            if (json_list.hasOwnProperty(i)){
                                let tmp = json_list[i];
                                if(json.uid===tmp.uid){
                                    json_list.splice(parseInt(i),1,json);
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                        if(flag){
                            json_list.push(json);
                        }
                        console.log("edit!");
                        $.ajax({
                            url:"../cz/php_cz/add_user.php",
                            type:"POST",
                            data:json,
                            // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                //data=JSON.parse(data);//cqz
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be deleted ,please try again later");
                            }
                        });
                        console.log(json);
                        console.log(json_list);
                        // $(this).html("Edit").toggleClass("bg-orange");
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='uid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        let json = {};
                        // json_list.push(json);
                        // let list = $("#"+id+"-row .my-editable")
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            // console.log(typeof item);
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                            // item.innerHTML=(input.value);
                        });
                        let flag = 1;
                        for(var i in json_list){
                            if (json_list.hasOwnProperty(i)){
                                let tmp = json_list[i];
                                if(json.uid===tmp.uid){
                                    json_list.splice(parseInt(i),1,json);
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                        if(flag){
                            json_list.push(json);
                        }
                        console.log("add!");
                        $.ajax({
                            url:"../cz/php_cz/add_user.php",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                //data=JSON.parse(data);
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be deleted ,please try again later");
                            }
                        });
                        console.log(json);
                        console.log(json_list);
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    for(var i in json_list){
                        if (json_list.hasOwnProperty(i)){
                            let tmp = json_list[i];
                            if(json.uid===tmp.uid){
                                json_list.splice(parseInt(i),1);
                                break;
                            }
                        }
                    }
                    //console.log(json.uid);
                    console.log("delete_2 in adder!");
                    $.ajax({
                        url:"../cz/php_cz/del_user.php",
                        type:"POST",
                        data:json,
                        // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            // $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                            // $("#"+id+"-row .my-del-btn").show();
                            //data=JSON.parse(data);
                            console.log(data);
                            console.log("submited");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                    console.log(json);
                    console.log(json_list);
                    // $(this).html("Edit").toggleClass("bg-orange");
                });
            });
        });
    }
}
function renderAdminUserlisttest() {//cz
    var head = "../assets/file/cxk.jpg";
    var namelist = ["head","name","uid","psw","type"];
    var typelist = ["file","text","text","text","text"];
    var json_list = [];
    $.ajax({
        url: "../cz/php_cz/load_user_list.php",
        type: "POST",
        dataType:"json",
        error: function(){
            alert('request error!发送失败');
        },
        data:{

        },
        complete:function()
        {
            console.log("executing finished!");
        },
        success: function(data){//如果调用php成功
            createUserList(data);
        }
    });
    function createUserList(data) {
        console.log("load!");
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let user = data[i];
                let ulname = user.name;
                // let ulhead = user.head;
                let ulhead = head;
                let uluid = user.uid;
                let ulpsw = user.psw;
                let ultype = user.type;
                let user_list = [];
                user_list.push("" +
                    "<tr id=\""+ uluid +"-row\">\n" +
                    "    <th scope=\"row\" class=\"name\">\n" +
                    "        <div class=\"media align-items-center\">\n" +
                    "            <a href=\"#\" class=\"avatar rounded-circle mr-1 my-editable-avatar\">\n" +
                    "                <img alt=\""+ulname+"\" src=\""+ulhead+"\">\n" +
                    "            </a>\n" +
                    "            <div class=\"media-body\">\n" +
                    "                <span class=\"mb-0 text-sm my-editable\">"+ulname+"</span>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </th>\n" +
                    "    <td class=\"user-id my-editable\">\n" +
                    uluid+
                    "    </td>\n" +
                    "    <td class=\"password my-editable\">\n" +
                    ulpsw+
                    "    </td>\n" +
                    "    <td class=\"type my-editable\">\n" +
                    ultype+
                    "    </td>\n" +
                    "    <td class=\"edit-container\">\n" +
                    "        <button id=\""+uluid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "        <button id=\""+uluid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "    </td>\n" +
                    "</tr>"
                );
                $("#user-list-add-btn-row").before(user_list);
            }
        }

        /*全局设定*/
        $("#user-list-form .my-edt-btn").on("click",function () {

            let id = this.id.slice(0,-8);
            console.log(id);
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable-avatar").each(function (i) {
                    $(this).html("" +
                        "<label for='head-input' class='m-0 w-100 h-100'></label>"+
                        "<input type='file' name=\""+ namelist[i] +"\" class='custom-file-input d-none file ' id='head-input'>"
                    );
                });
                $("#"+id+"-row .my-editable").each(function (i) {
                    let value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                    );
                });
                $("#"+id+"-row input[name='uid']").attr("readonly",true);
                $("#"+id+"-row input[name='type']").attr("readonly",true);
                $("#"+id+"-row .my-del-btn").hide();
                $(this).html("Save").toggleClass("bg-orange");
            }
            else {
                let fd = new FormData();
                $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                    let input = item.children[1];
                    fd.append(input.getAttribute("name"),input.files[0]);
                });
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    let input = item.children[0];
                    fd.append(input.getAttribute("name"),input.value);
                });
                console.log("edit!");
                $.ajax({
                    url:"../cz/php_cz/edit_user.php2",
                    type:"POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success:function(data){
                        console.log(data);
                        console.log("submited");
                        alert("success");
                        window.location.reload();
                        data = JSON.parse(data);
                        $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                            $(this).html("<img alt=\""+data.name+"\" src=\""+data.head+"\">");
                        });
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        //data=JSON.parse(data);//cqz
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be deleted ,please try again later");
                    }
                });
                console.log(fd);
                // $(this).html("Edit").toggleClass("bg-orange");
            }
        });
        $("#user-list-form .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            let json = {};
            $.each($("#"+id+"-row .my-editable"), function (i, item) {
                json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
            });
            for(var i in json_list){
                if (json_list.hasOwnProperty(i)){
                    let tmp = json_list[i];
                    if(json.uid===tmp.uid){
                        json_list.splice(parseInt(i),1);
                        break;
                    }
                }
            }
            console.log("json:",json);
            console.log("delete_1!");
            $.ajax({
                url:"../cz/php_cz/del_user.php",
                type:"POST",
                data:json,
                //contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                success:function(data){
                    //data=JSON.parse(data);
                    alert("success");
                    $("#"+id+"-row").remove();
                    console.log("status:",data["status"]);
                },
                error:function(){
                    alert("Connection error, please try again later");
                }
            });
            console.log(json);
            console.log(json_list);
        });
        $("#user-list-add-btn").on("click",function () {
            $("#user-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <div class=\"media align-items-center\">\n" +
                "            <a href=\"#\" class=\"avatar rounded-circle mr-1\">\n" +
                "                <img alt=\"new\" src=\"../assets/file/cxk.gif\">\n" +
                "            </a>\n" +
                "            <div class=\"media-body\">\n" +
                "                <span class=\"mb-0 text-sm my-editable\"><input type=\"text\" name=\"name\" class=\"text\"></span>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </th>\n" +
                "    <td class=\"user-id my-editable\"><input type=\"text\" name=\"uid\" class=\"text\"></td>\n" +
                "    <td class=\"password my-editable\"><input type=\"text\" name=\"psw\" class=\"text\"></td>\n" +
                "    <td class=\"type my-editable\"><input type=\"text\" name=\"type\" class=\"text\"></td>\n" +
                "    <td class=\"edit-container\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>"
            );
            let newRow = $("#new-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                for(var i in json_list){
                    if (json_list.hasOwnProperty(i)){
                        let tmp = json_list[i];
                        if(json.uid===tmp.uid){
                            json_list.splice(parseInt(i),1);
                            break;
                        }
                    }
                }
                //console.log(json.uid);
                console.log("delete_2 in adder!");
                $.ajax({
                    url:"../cz/php_cz/del_user.php",
                    type:"POST",
                    data:json,
                    // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        // $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        // $("#"+id+"-row .my-del-btn").show();
                        //data=JSON.parse(data);
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
                console.log(json);
                console.log(json_list);
                // $(this).html("Edit").toggleClass("bg-orange");
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='uid']")[0].value;
                newRow.attr("id",""+id+"-row");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);
                newSaveBtn.off("click");
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable-avatar").each(function (i) {
                            $(this).html("" +
                                "<label for='head-input' class='m-0 w-100 h-100'></label>"+
                                "<input type='file' name=\""+ namelist[i] +"\" class='custom-file-input d-none file ' id='head-input'>"
                            );
                        });
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='uid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        let fd = new FormData();
                        $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                            let input = item.children[1];
                            fd.append(input.getAttribute("name"),input.files[0]);
                        });
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        console.log("edit!");
                        $.ajax({
                            url:"../cz/php_cz/add_user.php",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                console.log(data);
                                console.log("submited");
                                alert("success");
                                window.location.reload();
                                data = JSON.parse(data);
                                $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                                    $(this).html("<img alt=\""+data.name+"\" src=\""+data.head+"\">");
                                });
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                            },
                            error:function(){
                                alert("Connection error, item cannot be deleted ,please try again later");
                            }
                        });
                        console.log(fd);
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {

                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable-avatar").each(function (i) {
                            $(this).html("" +
                                "<label for='head-input' class='m-0 w-100 h-100'></label>"+
                                "<input type='file' name=\""+ namelist[i] +"\" class='custom-file-input d-none file ' id='head-input'>"
                            );
                        });
                        $("#"+id+"-row .my-editable").each(function (i) {
                            let value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ namelist[i] +"\" class='text' value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='uid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        let fd = new FormData();
                        $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                            let input = item.children[1];
                            fd.append(input.getAttribute("name"),input.files[0]);
                        });
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        console.log("edit!");
                        $.ajax({
                            url:"../cz/php_cz/edit_user.php2",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                console.log(data);
                                console.log("submited");
                                alert("success");
                                window.location.reload();
                                data = JSON.parse(data);
                                $.each($("#"+id+"-row .my-editable-avatar"), function (i, item) {
                                    $(this).html("<img alt=\""+data.name+"\" src=\""+data.head+"\">");
                                });
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                //data=JSON.parse(data);//cqz
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be deleted ,please try again later");
                            }
                        });
                        console.log(fd);
                        // $(this).html("Edit").toggleClass("bg-orange");
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    for(var i in json_list){
                        if (json_list.hasOwnProperty(i)){
                            let tmp = json_list[i];
                            if(json.uid===tmp.uid){
                                json_list.splice(parseInt(i),1);
                                break;
                            }
                        }
                    }
                    //console.log(json.uid);
                    console.log("delete_2 in adder!");
                    $.ajax({
                        url:"../cz/php_cz/del_user.php",
                        type:"POST",
                        data:json,
                        // contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            // $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                            // $("#"+id+"-row .my-del-btn").show();
                            //data=JSON.parse(data);
                            console.log(data);
                            console.log("submited");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                    console.log(json);
                    console.log(json_list);
                    // $(this).html("Edit").toggleClass("bg-orange");
                });
            });
        });
    }
}

/*render the CourseList for Teacher or Admin*/
function renderAdminCourselist(data_url,add_url,edit_url,del_url) {

    data_url = "../php/admin_course.php";
    add_url = "../php/add_course.php";
    edit_url = "../php/update_course.php";
    del_url = "../php/del_course.php";


    var namelist = ["ctitle","cid","days","weeks","cover","home","syl","mod"];
    var typelist = ["text","number","text","number","file","file","file","file"];
    var classlist = ["text","number","text","number","file","file","file","file"];

    loadDataCourseList(data_url);
    function loadDataCourseList(data_url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                console.log(data);
                data = JSON.parse(data);
                createCourseList(data);
            }
        }
        xmlHttp.open("GET",data_url+"?action=get_course_list",true);
        xmlHttp.send();
    }
    function createCourseList(data) {
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let course = data[i];
                let clname = course.ctitle;
                let cluid = course.cid;
                let cldays = course.weekdays;
                let clweeks = course.end;
                let clcover = course.cover_url;
                let clhome = course.home_url;
                let clsyl = course.syllabus_url;
                let clmod = course.modles_url;
                let clquiz = course.quiz;/*link*/

                let course_list = [];
                course_list.push("" +
                    "<tr id=\""+cluid+"-row\">\n" +
                    "    <th class=\"course-name text-sm my-editable my-editable-text\">" +
                    clname +
                    "    </th>\n" +
                    "    <td class=\"course-id my-editable my-editable-text\">" +
                    cluid +
                    "    </td>" +
                    "    <td class=\"course-days my-editable my-editable-text\">" +
                    cldays +
                    "    </td>" +
                    "    <td class=\"course-weeks my-editable my-editable-text\">" +
                    clweeks +
                    "    </td>" +
                    "    <td class=\"cover my-editable my-editable-file\">" +
                    clcover +
                    "    </td>\n" +
                    "    <td class=\"home my-editable my-editable-file\">" +
                    clhome +
                    "    </td>\n" +
                    "    <td class=\"syllabus my-editable my-editable-file\">" +
                    clsyl +
                    "    </td>\n" +
                    "    <td class=\"modules my-editable my-editable-file\">" +
                    clmod +
                    "    </td>\n" +
                    "    <td class=\"quiz\">\n" +
                    "        <a href=\"Admin_Course_Quiz.html\" id=\"c"+cluid+"\">link</a>\n" +
                    "    </td>\n" +
                    "    <td class=\"edit-container\" style=\"width: 15rem\">\n" +
                    "        <button id=\""+cluid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "        <button id=\""+cluid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#course-list-add-btn-row").before(course_list);
                $(".quiz a").on('click',function () {
                    setCookie('cid',this.id.slice(1));
                });
            }
        }

        /*全局设定*/
        $("#course-list-form .my-edt-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                    );
                });
                $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                $("#"+id+"-row input[name='cid']").attr("readonly",true);
                $("#"+id+"-row .my-del-btn").hide();
                $(this).html("Save").toggleClass("bg-orange");
            }
            else {
                if(!validForm("course-list-form")){
                    alert("Please complete the form");
                    return;
                }
                let fd = new FormData();
                fd.append("uid",getCookie("uid"));
                $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                    let input = item.children[0];
                    fd.append(input.getAttribute("name"),input.value);
                });
                $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                    let input = item.children[0];
                    fd.append(input.getAttribute("name"),input.files[0]);
                    // console.log(input.value);
                });
                $.ajax({
                    url:edit_url+"?action=edit_course_list",
                    type:"POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success:function(data){
                        alert("success");
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be update ,please try again later");
                    }
                });
                console.log(fd);
            }
        });
        $("#course-list-form .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log("deleting "+id);
            $.ajax({
                url:del_url+"?action=delete_course_list&cid="+id,
                type:"GET",
                success:function(data){
                    alert("success");
                    $("#"+id+"-row").remove();
                    console.log(data);
                    console.log("submited");
                },
                error:function(){
                    alert("Connection error, item cannot be deleted, please try again later");
                }
            });
        });
        $("#course-list-add-btn").on("click",function () {
            if(!validForm("course-list-form")){
                alert("Please complete the form first");
                return;
            }
            $("#course-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th class=\"course-name text-sm my-editable my-editable-text\">\n" +
                "        <input type=\"text\" name=\"ctitle\" class=\"text\" required='required'>\n" +
                "    </th>\n" +
                "    <td class=\"course-id my-editable my-editable-text\">\n" +
                "        <input type=\"number\" name=\"cid\" class=\"text\" required='required'>" +
                "    </td>\n" +
                "    <td class=\"course-days my-editable my-editable-text\">" +
                "       <input type=\"text\" name=\"days\" class=\"text\" required='required' pattern='([1-9]\\d*,)*[1-9]\\d*'>" +
                "    </td>\n" +
                "    <td class=\"course-weeks my-editable my-editable-text\">" +
                "        <input type=\"number\" name=\"weeks\" class=\"text\" required='required'>" +
                "    </td>"+
                "    <td class=\"cover my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"cover\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"home my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"home\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"syllabus my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"syl\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"modules my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"mod\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"quiz\">\n" +
                "        <a href=\"Admin_Course_Quiz.html\">link</a>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 15rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>");
            let newRow = $("#new-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log("deleting "+id);
                $.ajax({
                    url:del_url+"?action=delete_course_list&cid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be deleted, please try again later");
                    }
                });
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='cid']")[0].value;
                console.log(id);
                newRow.attr("id",""+id+"-row");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log("asdasdasd");
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                                // "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                        $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                        $("#"+id+"-row input[name='cid']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        if(!validForm("course-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let fd = new FormData();
                        fd.append("uid",getCookie("uid"));
                        $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.files[0]);
                            // console.log(input.value);
                        });

                        $.ajax({
                            url:add_url+"?action=add_course_list",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be update ,please try again later");
                            }
                        });
                        console.log(fd);
                    }
                }
                $("#"+id+"-edt-btn").off("click");
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                            );
                        });
                        $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                        $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                        $("#"+id+"-row input[name='cid']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        if(!validForm("course-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let fd = new FormData();
                        fd.append("uid",getCookie("uid"));
                        $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.files[0]);
                            // console.log(input.value);
                        });
                        $.ajax({
                            url:edit_url+"?action=edit_course_list",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be update ,please try again later");
                            }
                        });
                        console.log(fd);
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log("deleting "+id);
                    $.ajax({
                        url:del_url+"?action=delete_course_list&cid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            console.log(data);
                            console.log("submited");
                        },
                        error:function(){
                            alert("Connection error, item cannot be deleted, please try again later");
                        }
                    });
                });
            });

        });
        $(".quiz a").on('click',function () {
            // alert(this.id);
            setCookie('cid',this.id.slice(1));
        });
    }
}
function renderTeacherCourselist(data_url,add_url,edit_url,del_url) {

    data_url = "../php/admin_course.php";
    add_url = "../php/add_course.php";
    edit_url = "../php/update_course.php";
    del_url = "../php/del_course.php";


    var namelist = ["ctitle","cid","days","weeks","cover","home","syl","mod"];
    var typelist = ["text","number","text","number","file","file","file","file"];
    var classlist = ["text","number","text","number","file","file","file","file"];

    loadDataCourseList(data_url);
    function loadDataCourseList(data_url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                console.log(data);
                data = JSON.parse(data);
                createCourseList(data);
            }
        }
        xmlHttp.open("GET",data_url+"?action=get_course_list&uid="+uid,true);
        xmlHttp.send();
    }
    function createCourseList(data) {
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let course = data[i];
                let clname = course.ctitle;
                let cluid = course.cid;
                let cldays = course.weekdays;
                let clweeks = course.end;
                let clcover = course.cover_url;
                let clhome = course.home_url;
                let clsyl = course.syllabus_url;
                let clmod = course.modles_url;
                let clquiz = course.quiz;/*link*/

                let course_list = [];
                course_list.push("" +
                    "<tr id=\""+cluid+"-row\">\n" +
                    "    <th class=\"course-name text-sm my-editable my-editable-text\">" +
                    clname +
                    "    </th>\n" +
                    "    <td class=\"course-id my-editable my-editable-text\">" +
                    cluid +
                    "    </td>" +
                    "    <td class=\"course-days my-editable my-editable-text\">" +
                    cldays +
                    "    </td>" +
                    "    <td class=\"course-weeks my-editable my-editable-text\">" +
                    clweeks +
                    "    </td>" +
                    "    <td class=\"cover my-editable my-editable-file\">" +
                    clcover +
                    "    </td>\n" +
                    "    <td class=\"home my-editable my-editable-file\">" +
                    clhome +
                    "    </td>\n" +
                    "    <td class=\"syllabus my-editable my-editable-file\">" +
                    clsyl +
                    "    </td>\n" +
                    "    <td class=\"modules my-editable my-editable-file\">" +
                    clmod +
                    "    </td>\n" +
                    "    <td class=\"quiz\">\n" +
                    "        <a href=\"Teacher_Course_Quiz.html\" id=\"c"+cluid+"\">link</a>\n" +
                    "    </td>\n" +
                    "    <td class=\"edit-container\" style=\"width: 15rem\">\n" +
                    "        <button id=\""+cluid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "        <button id=\""+cluid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#course-list-add-btn-row").before(course_list);
                $(".quiz a").on('click',function () {
                    setCookie('cid',this.id.slice(1));
                });
            }
        }

        /*全局设定*/
        $("#course-list-form .my-edt-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                    );
                });
                $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                $("#"+id+"-row input[name='cid']").attr("readonly",true);
                $("#"+id+"-row .my-del-btn").hide();
                $(this).html("Save").toggleClass("bg-orange");
            }
            else {
                if(!validForm("course-list-form")){
                    alert("Please complete the form");
                    return;
                }
                let fd = new FormData();
                fd.append("uid",getCookie("uid"));
                $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                    let input = item.children[0];
                    fd.append(input.getAttribute("name"),input.value);
                });
                $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                    let input = item.children[0];
                    fd.append(input.getAttribute("name"),input.files[0]);
                    // console.log(input.value);
                });
                $.ajax({
                    url:edit_url+"?action=edit_course_list",
                    type:"POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success:function(data){
                        alert("success");
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be update ,please try again later");
                    }
                });
                console.log(fd);
            }
        });
        $("#course-list-form .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log("deleting "+id);
            $.ajax({
                url:del_url+"?action=delete_course_list&cid="+id,
                type:"GET",
                success:function(data){
                    alert("success");
                    $("#"+id+"-row").remove();
                    console.log(data);
                    console.log("submited");
                },
                error:function(){
                    alert("Connection error, item cannot be deleted, please try again later");
                }
            });
        });
        $("#course-list-add-btn").on("click",function () {
            if(!validForm("course-list-form")){
                alert("Please complete the form first");
                return;
            }
            $("#course-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th class=\"course-name text-sm my-editable my-editable-text\">\n" +
                "        <input type=\"text\" name=\"ctitle\" class=\"text\" required='required'>\n" +
                "    </th>\n" +
                "    <td class=\"course-id my-editable my-editable-text\">\n" +
                "        <input type=\"number\" name=\"cid\" class=\"text\" required='required'>" +
                "    </td>\n" +
                "    <td class=\"course-days my-editable my-editable-text\">" +
                "       <input type=\"text\" name=\"days\" class=\"text\" required='required' pattern='([1-9]\\d*,)*[1-9]\\d*'>" +
                "    </td>\n" +
                "    <td class=\"course-weeks my-editable my-editable-text\">" +
                "        <input type=\"number\" name=\"weeks\" class=\"text\" required='required'>" +
                "    </td>"+
                "    <td class=\"cover my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"cover\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"home my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"home\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"syllabus my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"syl\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"modules my-editable my-editable-file\">\n" +
                "        <input type=\"file\" name=\"mod\" class=\"file\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"quiz\">\n" +
                "        <a href=\"Teacher_Course_Quiz.html\">link</a>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 15rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>");
            let newRow = $("#new-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log("deleting "+id);
                $.ajax({
                    url:del_url+"?action=delete_course_list&cid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be deleted, please try again later");
                    }
                });
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='cid']")[0].value;
                console.log(id);
                newRow.attr("id",""+id+"-row");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log("asdasdasd");
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                                // "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +">"
                            );
                        });
                        $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                        $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                        $("#"+id+"-row input[name='cid']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        if(!validForm("course-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let fd = new FormData();
                        fd.append("uid",getCookie("uid"));
                        $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.files[0]);
                            // console.log(input.value);
                        });

                        $.ajax({
                            url:add_url+"?action=add_course_list",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be update ,please try again later");
                            }
                        });
                        console.log(fd);
                    }
                }
                $("#"+id+"-edt-btn").off("click");
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='"+typelist[i]+"' name=\""+ namelist[i] +"\" class="+classlist[i]+" value="+ value +" required='required'>"
                            );
                        });
                        $("#"+id+"-row input[name='days']").attr("pattern","([1-9]\\d*,)*[1-9]\\d*");
                        $("#"+id+"-row input[name='ctitle']").attr("readonly",true);
                        $("#"+id+"-row input[name='cid']").attr("readonly",true);
                        $("#"+id+"-row .my-del-btn").hide();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    else {
                        if(!validForm("course-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let fd = new FormData();
                        fd.append("uid",getCookie("uid"));
                        $.each($("#"+id+"-row .my-editable.my-editable-text"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.value);
                        });
                        $.each($("#"+id+"-row .my-editable.my-editable-file"), function (i, item) {
                            let input = item.children[0];
                            fd.append(input.getAttribute("name"),input.files[0]);
                            // console.log(input.value);
                        });
                        $.ajax({
                            url:edit_url+"?action=edit_course_list",
                            type:"POST",
                            processData: false,
                            contentType: false,
                            data: fd,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be update ,please try again later");
                            }
                        });
                        console.log(fd);
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log("deleting "+id);
                    $.ajax({
                        url:del_url+"?action=delete_course_list&cid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            console.log(data);
                            console.log("submited");
                        },
                        error:function(){
                            alert("Connection error, item cannot be deleted, please try again later");
                        }
                    });
                });
            });

        });
        $(".quiz a").on('click',function () {
            // alert(this.id);
            setCookie('cid',this.id.slice(1));
        });
    }
}


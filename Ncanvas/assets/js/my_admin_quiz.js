var uid = getCookie('uid');
var cid = getCookie('cid');


function renderAdminQuizlist(data_url,add_url,edit_url,del_url) {
    data_url = "../assets/file/quiz.json";
    add_url = "../php/add_quiz.php";
    edit_url = "../php/update_quiz.php";
    del_url = "../php/del_quiz.php";

    var namelist = ["tname","tid","type","due"];
    var typelist = ["text","number","text","text"];
    var maxid = 0;



    loadDataUser(data_url);
    function loadDataUser(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                createQuizList(data);
            }
        };
        xmlHttp.open("GET",url+"?action=get_quiz_list&uid="+uid+"&cid="+cid,true);
        xmlHttp.send();
    }
    function createQuizList(data) {
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let quiz = data[i];
                let qltname = quiz.tname;
                let qltid = quiz.tid;
                let qldue = quiz.due;
                let qltype = (quiz.QA.length===0)?"sub":"obj";
                if(maxid<parseInt(qltid)){maxid = parseInt(qltid)}
                "objective";"subjective";
                $("#quiz-list-add-btn-row").before("" +
                    "<tr id=\""+qltid+"-row\">\n" +
                    "<th scope=\"row\" class=\"name\">\n" +
                    "<a href=\"#t"+qltid+"-question-form\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">" +
                    qltname +
                    "</a>\n" +
                    "</th>" +
                    "<td class='tid my-editable'>" +
                    qltid +
                    "</td>" +
                    "<td class='type my-editable text-capitalize'>" +
                    qltype +
                    "</td>"+
                    "<td class=\"due my-editable\">" +
                    qldue +
                    "</td>\n" +
                    "<td class=\"edit-container\" style=\"width: 2rem\">\n" +
                    "<button id=\""+qltid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "<button id=\""+qltid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "</td>\n" +
                    "</tr>"

                );
                $("#quiz-list-add-btn-row").before("" +
                    "<tr class=\"border-bottom-0 "+qltype+"-question-row\" id=\""+qltid+"-question-row\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\">\n" +
                    "        <form class=\"collapse\" action=\"\" id=\"t"+qltid+"-question-form\">\n" +
                    "            <button id=\""+qltid+"-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn "+qltype+"-question-list-add-btn\" >Add New Question</button>" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>"
                );
                /*render mul type*/
                let qlqa = quiz.QA;
                let question_list = [];
                for(var j in qlqa){
                    if(qlqa.hasOwnProperty(j)){
                        let question = qlqa[j];
                        let title = question.title;
                        let choice = [question.choiceA,question.choiceB,question.choiceC,question.choiceD];
                        let std = question.std;
                        question_list.push("" +
                            "<hr class=\"m-0 mx-3\">\n" +
                            "<div class=\"card-body py-3 question-container obj-question\">" +
                            "<span class='my-editable my-editable-obj-title'>" +
                            title +
                            "</span>\n" +
                            "<div class=\" mt-2 choice-container\">\n" +
                            // "<div id=\""+qltid+"-0\" class=\"my-editable my-editable-obj-choice\">" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[0]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[1]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[2]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[3]+
                            "</div>\n" +
                            "<div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">" +
                            ""+std+
                            "</div>\n" +
                            "</div>\n" +
                            "</div>"
                        );
                    }
                }
                $("#"+qltid+"-question-list-add-btn").before(question_list);

                /*render file type*/
                let qlqb = quiz.QB;
                console.log(qlqb);
                question_list = [];
                for(j in qlqb){
                    if(qlqb.hasOwnProperty(j)){
                        let question = qlqb[j];
                        let title = question.title;
                        question_list.push("" +
                            "<hr class=\"m-0 mx-3\">" +
                            "<div class=\"card-body py-3 question-container sub-question\">" +
                            "<span class='my-editable my-editable-sub-title'>" +
                            title +
                            "</span>" +
                            "</div>"
                        );
                    }
                }
                $("#"+qltid+"-question-list-add-btn").before(question_list);

            }
        }
        $(".question-list-add-btn").hide();
        /*全局设定*/
        $("#quiz-table .my-edt-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            /*点击了edit*/
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*QA naming*/
                var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*QB naming*/
                var qb_namelist = ["title"];
                $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*button changing*/
                $("#"+id+"-row input[name='tid']").attr("readonly",true);
                $("#"+id+"-row input[name='type']").attr("readonly",true);
                $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                $("#"+id+"-row .my-del-btn").hide();
                $("#"+id+"-question-list-add-btn").show();
                $(this).html("Save").toggleClass("bg-orange");
            }
            /*点击了save*/
            else {
                if(!validForm("quiz-list-form")){
                    alert("Please complete the form");
                    return;
                }
                let json = {};
                /*test input*/
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    let input = item.children[0];
                    json[input.getAttribute("name")] = input.value;
                });
                /*QA input*/
                let qa_list = [];
                let cnt = 0;
                $.each($("#"+id+"-question-row .obj-question"),function(){
                    let qa_json = {};
                    cnt++;
                    $.each($(this).find(".my-editable"),function(j,item){
                        let input = item.children[0];
                        qa_json[input.getAttribute("name")] = input.value;
                    });
                    qa_list.push(qa_json);
                });
                json["QA"] = qa_list;
                /*QB input*/
                let qb_list = [];
                $.each($("#"+id+"-question-row .sub-question"),function(){
                    let qb_json = {};
                    $.each($(this).find(".my-editable"),function(j,item){
                        let input = item.children[0];
                        qb_json[input.getAttribute("name")] = input.value;
                    });
                    qb_list.push(qb_json);
                });
                json["QB"] = qb_list;
                json["uid"] = uid;
                json["cid"] = cid;
                if(qa_list.length===0){
                    json["ttype"] = 1;
                    json["cnt"] = qb_list.length;
                }
                else {
                    json["ttype"] = 0;
                    json["cnt"] = qa_list.length;
                }
                console.log(json);
                $.ajax({
                    url:edit_url+"?action=edit_user_list",
                    type:"POST",
                    data:json,
                    success:function(data){
                        alert("success");
                        $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                        $("#t"+id+"-question-form").parent().attr({"colspan":5});
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        $("#"+id+"-question-list-add-btn").hide();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be updated ,please try again later");
                    }
                });
            }
        });
        $("#quiz-table .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            let json = {};
            $.each($("#"+id+"-row .my-editable"), function (i, item) {
                json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
            });
            console.log(json);
            $.ajax({
                url:del_url+"?action=delete_quiz_list&tid="+id,
                type:"GET",
                success:function(data){
                    alert("success");
                    $("#"+id+"-row").remove();
                    $("#"+id+"-question-row").remove();
                    console.log(data);
                    console.log("deleted");
                },
                error:function(){
                    alert("Connection error, please try again later");
                }
            });
        });
        $(".obj-question-list-add-btn").on("click",function () {
            let tid = this.id.slice(0,-22);
            console.log(tid);
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            $("#"+tid+"-question-list-add-btn").before("" +
                "<hr class=\"m-0 mx-3\">\n" +
                "<div class=\"card-body py-3 question-container obj-question\">\n" +
                "    <span class=\"my-editable my-editable-obj-title\">\n" +
                "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "    </span>\n" +
                "    <div class=\" mt-2 choice-container\">\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                "       </div>"+
                "    </div>" +
                "</div>"
            );
        });
        $(".sub-question-list-add-btn").on("click",function () {
            let tid = this.id.slice(0,-22);
            console.log(tid);
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            $("#"+tid+"-question-list-add-btn").before("" +
                "<hr class=\"m-0 mx-3\">\n" +
                "<div class=\"card-body py-3 question-container sub-question\">\n" +
                "    <span class=\"my-editable my-editable-sub-title\">\n" +
                "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "    </span>\n" +
                "</div>"
            );
        });
        $("#obj-test-add-btn").on("click",function () {
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            if($("#new-row")[0]){
                alert("Please finish the new quiz first");
                return;
            }
            $("#quiz-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <a href=\"#\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
                "            <input type=\"text\" name=\"tname\" class=\"text\" required='required'>\n" +
                "        </a>\n" +
                "    </th>\n" +
                "    <td class=\"tid my-editable\">\n" +
                "        <input type=\"number\" name=\"tid\" class=\"text\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"type my-editable text-capitalize\">\n" +
                "        <input type=\"text\" name=\"type\" class=\"text\" list=\"typeList\" required='required'>\n" +
                "        <datalist id=\"typeList\">" +
                "        <option label=\"Obj\" value=\"Obj\" />" +
                "        <option label=\"Sub\" value=\"Sub\" />" +
                "        </datalist>"+
                "    </td>\n" +
                "    <td class=\"due my-editable\">\n" +
                "        <input type=\"text\" name=\"due\" class=\"text\" pattern='\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}' required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 2rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>\n" +
                "<tr class=\"border-bottom-0 obj-question-row\" id=\"new-question-row\">\n" +
                "    <td colspan=\"4\" class=\"p-0 border-top-0\">\n" +
                "        <form class=\"collapse show\" action=\"\" id=\"new-question-form\" readonly=\"readonly\">\n" +
                "            <hr class=\"m-0 mx-3\">\n" +
                "            <div class=\"card-body py-3 question-container obj-question\">\n" +
                "                <span class=\"my-editable my-editable-obj-title\">\n" +
                "                    <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "                </span>\n" +
                "                <div class=\" mt-2 choice-container\">\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                "                    </div>" +
                "                    <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                "                       <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                "                    </div>" +
                "                </div>\n" +
                "            </div>\n" +
                "            </div><button id=\"new-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn obj-question-list-add-btn\" style=\"\">Add New Question</button>\n" +
                "        </form>\n" +
                "    </td>\n" +
                "</tr>"
            );

            /*add the listener to new btns*/
            let newRow = $("#new-row");
            let newQuestionRow = $("#new-question-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#new-question-list-add-btn").on("click",function () {
                let tid = this.id.slice(0,-22);
                console.log(tid);
                $("#"+tid+"-question-list-add-btn").before("" +
                    "<hr class=\"m-0 mx-3\">\n" +
                    "<div class=\"card-body py-3 question-container obj-question\">\n" +
                    "    <span class=\"my-editable my-editable-obj-title\">\n" +
                    "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                    "    </span>\n" +
                    "    <div class=\" mt-2 choice-container\">\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                    "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                    "       </div>"+
                    "    </div>" +
                    "</div>"
                );
            });
            $("#new-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                console.log(json);
                $.ajax({
                    url:del_url+"?action=delete_quiz_list&tid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        $("#"+id+"-question-row").remove();
                        console.log(data);
                        console.log("deleted");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
            });
            $("#new-edt-btn").on("click",function () {
                if(!validForm("quiz-list-form")){
                    alert("Please complete the form");
                    return;
                }
                id = newRow.find("[name='tid']")[0].value;
                newRow.attr("id",""+id+"-row");
                newQuestionRow.attr("id",""+id+"-question-row").find("#new-question-form").attr("id","t"+id+"-question-form")
                    .find("#new-question-list-add-btn").attr("id",""+id+"-question-list-add-btn");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);

                $("#"+id+"-edt-btn").off("click");
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container obj-question\">\n" +
                        "    <span class=\"my-editable my-editable-obj-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "    <div class=\" mt-2 choice-container\">\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                        "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                        "       </div>"+
                        "    </div>" +
                        "</div>"
                    );
                });
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:add_url+"?action=add_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:edit_url+"?action=edit_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container obj-question\">\n" +
                        "    <span class=\"my-editable my-editable-obj-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "    <div class=\" mt-2 choice-container\">\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                        "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                        "       </div>"+
                        "    </div>" +
                        "</div>"
                    );
                });
            });
        });
        $("#sub-test-add-btn").on("click",function () {
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            if($("#new-row")[0]){
                alert("Please finish the new quiz first");
                return;
            }
            $("#quiz-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <a href=\"#\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
                "            <input type=\"text\" name=\"tname\" class=\"text\" required='required'>\n" +
                "        </a>\n" +
                "    </th>\n" +
                "    <td class=\"tid my-editable\">\n" +
                "        <input type=\"number\" name=\"tid\" class=\"text\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"type my-editable text-capitalize\">\n" +
                "        <input type=\"text\" name=\"type\" class=\"text\" list=\"typeList\" required='required'>\n" +
                "        <datalist id=\"typeList\">" +
                "        <option label=\"Obj\" value=\"Obj\" />" +
                "        <option label=\"Sub\" value=\"Sub\" />" +
                "        </datalist>"+
                "    </td>\n" +
                "    <td class=\"due my-editable\">\n" +
                "        <input type=\"text\" name=\"due\" class=\"text\" pattern='\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}' required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 2rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>\n" +
                "<tr class=\"border-bottom-0 sub-question-row\" id=\"new-question-row\">\n" +
                "    <td colspan=\"4\" class=\"p-0 border-top-0\">\n" +
                "        <form class=\"collapse show\" action=\"\" id=\"new-question-form\" readonly=\"readonly\">\n" +
                "            <hr class=\"m-0 mx-3\">\n" +
                "            <div class=\"card-body py-3 question-container sub-question\">\n" +
                "                <span class=\"my-editable my-editable-sub-title\">\n" +
                "                    <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "                </span>\n" +
                "            </div><button id=\"new-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn sub-question-list-add-btn\" style=\"\">Add New Question</button>\n" +
                "        </form>\n" +
                "    </td>\n" +
                "</tr>"
            );

            /*add the listener to sub btns*/
            let newRow = $("#new-row");
            let newQuestionRow = $("#new-question-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-question-list-add-btn").on("click",function () {
                let tid = this.id.slice(0,-22);
                console.log(tid);
                $("#"+tid+"-question-list-add-btn").before("" +
                    "<hr class=\"m-0 mx-3\">\n" +
                    "<div class=\"card-body py-3 question-container sub-question\">\n" +
                    "    <span class=\"my-editable my-editable-sub-title\">\n" +
                    "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                    "    </span>\n" +
                    "</div>"
                );
            });
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                console.log(json);
                $.ajax({
                    url:del_url+"?action=delete_quiz_list&tid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        $("#"+id+"-question-row").remove();
                        console.log(data);
                        console.log("deleted");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='tid']")[0].value;
                console.log(id);
                newRow.attr("id",""+id+"-row");
                newQuestionRow.attr("id",""+id+"-question-row").find("#new-question-form").attr("id",""+id+"-question-form")
                    .find("#new-question-list-add-btn").attr("id",""+id+"-question-list-add-btn");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);

                $("#"+id+"-edt-btn").off("click");
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:add_url+"?action=add_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:edit_url+"?action=edit_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container sub-question\">\n" +
                        "    <span class=\"my-editable my-editable-sub-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "</div>"
                    );
                });
            });
        });
    }
}
function renderTeacherQuizlist(data_url,add_url,edit_url,del_url) {
    data_url = "../php/student_quiz_list.php";
    add_url = "../php/add_quiz.php";
    edit_url = "../php/update_quiz.php";
    del_url = "../php/del_quiz.php";

    var namelist = ["tname","tid","type","due"];
    var typelist = ["text","number","text","text"];
    var maxid = 0;



    loadDataUser(data_url);
    function loadDataUser(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                createQuizList(data);
            }
        };
        xmlHttp.open("GET",url+"?action=get_quiz_list&uid="+uid+"&cid="+cid,true);
        xmlHttp.send();
    }
    function createQuizList(data) {
        /*data json*/
        for(var i in data){
            if(data.hasOwnProperty(i)){
                let quiz = data[i];
                let qltname = quiz.tname;
                let qltid = quiz.tid;
                let qldue = quiz.due;
                let qltype = (quiz.QA.length===0)?"sub":"obj";
                let qllink = quiz.link;
                if(maxid<parseInt(qltid)){maxid = parseInt(qltid)}
                "objective";"subjective";
                $("#quiz-list-add-btn-row").before("" +
                    "<tr id=\""+qltid+"-row\">\n" +
                    "<th scope=\"row\" class=\"name\">\n" +
                    "<a href=\"#t"+qltid+"-question-form\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">" +
                    qltname +
                    "</a>\n" +
                    "</th>" +
                    "<td class='tid my-editable'>" +
                    qltid +
                    "</td>" +
                    "<td class='type my-editable text-capitalize'>" +
                    qltype +
                    "</td>"+
                    "<td class=\"due my-editable\">" +
                    qldue +
                    "</td>\n" +
                    "<td class=\"edit-container\" style=\"width: 2rem\">\n" +
                    "<button id=\""+qltid+"-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn\">Edit</button>\n" +
                    "<button id=\""+qltid+"-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\">Delete</button>\n" +
                    "</td>\n" +
                    "</tr>"

                );
                $("#quiz-list-add-btn-row").before("" +
                    "<tr class=\"border-bottom-0 "+qltype+"-question-row\" id=\""+qltid+"-question-row\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\">\n" +
                    "        <form class=\"collapse\" action=\"\" id=\"t"+qltid+"-question-form\">\n" +
                    "            <button id=\""+qltid+"-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn "+qltype+"-question-list-add-btn\" >Add New Question</button>" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>"
                );
                /*render mul type*/
                let qlqa = quiz.QA;
                let question_list = [];
                for(var j in qlqa){
                    if(qlqa.hasOwnProperty(j)){
                        let question = qlqa[j];
                        let title = question.title;
                        let choice = [question.choiceA,question.choiceB,question.choiceC,question.choiceD];
                        let std = question.std;
                        question_list.push("" +
                            "<hr class=\"m-0 mx-3\">\n" +
                            "<div class=\"card-body py-3 question-container obj-question\">" +
                            "<span class='my-editable my-editable-obj-title'>" +
                            title +
                            "</span>\n" +
                            "<div class=\" mt-2 choice-container\">\n" +
                            // "<div id=\""+qltid+"-0\" class=\"my-editable my-editable-obj-choice\">" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[0]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[1]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[2]+
                            "</div>\n" +
                            "<div class=\"my-editable my-editable-obj-choice\">" +
                            ""+choice[3]+
                            "</div>\n" +
                            "<div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">" +
                            ""+std+
                            "</div>\n" +
                            "</div>\n" +
                            "</div>"
                        );
                    }
                }
                $("#"+qltid+"-question-list-add-btn").before(question_list);

                /*render file type*/
                let qlqb = quiz.QB;
                console.log(qlqb);
                question_list = [];
                for(j in qlqb){
                    if(qlqb.hasOwnProperty(j)){
                        let question = qlqb[j];
                        let title = question.title;
                        question_list.push("" +
                            "<hr class=\"m-0 mx-3\">" +
                            "<div class=\"card-body py-3 question-container sub-question\">" +
                            "<span class='my-editable my-editable-sub-title'>" +
                            title +
                            "</span>" +
                            "</div>"
                        );
                    }
                }
                $("#"+qltid+"-question-list-add-btn").before(question_list);
                if(qltype==="sub"){
                    $("#"+qltid+"-question-list-add-btn").after("" +
                        "<div class=\"card-body py-3 download-container\">\n" +
                        "    <span>\n" +
                        "    <a class='text-gray' href='"+qllink+"' target=\"_blank\">Correct the homework</a>"+
                        "    </span>\n" +
                        "</div>"
                    );
                }

            }
        }

        $(".question-list-add-btn").hide();
        /*全局设定*/
        $("#quiz-table .my-edt-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            /*点击了edit*/
            if($(this).html()==="Edit"){
                $("#"+id+"-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*QA naming*/
                var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*QB naming*/
                var qb_namelist = ["title"];
                $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                    var value = $(this).html();
                    $(this).html("" +
                        "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                    );
                });
                /*button changing*/
                $("#"+id+"-row input[name='tid']").attr("readonly",true);
                $("#"+id+"-row input[name='type']").attr("readonly",true);
                $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                $("#"+id+"-row .my-del-btn").hide();
                $("#"+id+"-question-list-add-btn").show();
                $(this).html("Save").toggleClass("bg-orange");
            }
            /*点击了save*/
            else {
                if(!validForm("quiz-list-form")){
                    alert("Please complete the form");
                    return;
                }
                let json = {};
                /*test input*/
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    let input = item.children[0];
                    json[input.getAttribute("name")] = input.value;
                });
                /*QA input*/
                let qa_list = [];
                let cnt = 0;
                $.each($("#"+id+"-question-row .obj-question"),function(){
                    let qa_json = {};
                    cnt++;
                    $.each($(this).find(".my-editable"),function(j,item){
                        let input = item.children[0];
                        qa_json[input.getAttribute("name")] = input.value;
                    });
                    qa_list.push(qa_json);
                });
                json["QA"] = qa_list;
                /*QB input*/
                let qb_list = [];
                $.each($("#"+id+"-question-row .sub-question"),function(){
                    let qb_json = {};
                    $.each($(this).find(".my-editable"),function(j,item){
                        let input = item.children[0];
                        qb_json[input.getAttribute("name")] = input.value;
                    });
                    qb_list.push(qb_json);
                });
                json["QB"] = qb_list;
                json["uid"] = uid;
                json["cid"] = cid;
                if(qa_list.length===0){
                    json["ttype"] = 1;
                    json["cnt"] = qb_list.length;
                }
                else {
                    json["ttype"] = 0;
                    json["cnt"] = qa_list.length;
                }
                console.log(json);
                $.ajax({
                    url:edit_url+"?action=edit_user_list",
                    type:"POST",
                    data:json,
                    success:function(data){
                        alert("success");
                        $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            item.innerHTML=(input.value);
                        });
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                        $("#t"+id+"-question-form").parent().attr({"colspan":5});
                        $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                        $("#"+id+"-row .my-del-btn").show();
                        $("#"+id+"-question-list-add-btn").hide();
                        console.log(data);
                        console.log("submited");
                    },
                    error:function(){
                        alert("Connection error, item cannot be updated ,please try again later");
                    }
                });
            }
        });
        $("#quiz-table .my-del-btn").on("click",function () {
            let id = this.id.slice(0,-8);
            console.log(id);
            let json = {};
            $.each($("#"+id+"-row .my-editable"), function (i, item) {
                json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
            });
            console.log(json);
            $.ajax({
                url:del_url+"?action=delete_quiz_list&tid="+id,
                type:"GET",
                success:function(data){
                    alert("success");
                    $("#"+id+"-row").remove();
                    $("#"+id+"-question-row").remove();
                    console.log(data);
                    console.log("deleted");
                },
                error:function(){
                    alert("Connection error, please try again later");
                }
            });
        });
        $(".obj-question-list-add-btn").on("click",function () {
            let tid = this.id.slice(0,-22);
            console.log(tid);
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            $("#"+tid+"-question-list-add-btn").before("" +
                "<hr class=\"m-0 mx-3\">\n" +
                "<div class=\"card-body py-3 question-container obj-question\">\n" +
                "    <span class=\"my-editable my-editable-obj-title\">\n" +
                "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "    </span>\n" +
                "    <div class=\" mt-2 choice-container\">\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                "        </div>\n" +
                "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                "       </div>"+
                "    </div>" +
                "</div>"
            );
        });
        $(".sub-question-list-add-btn").on("click",function () {
            let tid = this.id.slice(0,-22);
            console.log(tid);
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            $("#"+tid+"-question-list-add-btn").before("" +
                "<hr class=\"m-0 mx-3\">\n" +
                "<div class=\"card-body py-3 question-container sub-question\">\n" +
                "    <span class=\"my-editable my-editable-sub-title\">\n" +
                "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "    </span>\n" +
                "</div>"
            );
        });
        $("#obj-test-add-btn").on("click",function () {
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            if($("#new-row")[0]){
                alert("Please finish the new quiz first");
                return;
            }
            $("#quiz-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <a href=\"#\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
                "            <input type=\"text\" name=\"tname\" class=\"text\" required='required'>\n" +
                "        </a>\n" +
                "    </th>\n" +
                "    <td class=\"tid my-editable\">\n" +
                "        <input type=\"number\" name=\"tid\" class=\"text\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"type my-editable text-capitalize\">\n" +
                "        <input type=\"text\" name=\"type\" class=\"text\" list=\"typeList\" required='required'>\n" +
                "        <datalist id=\"typeList\">" +
                "        <option label=\"Obj\" value=\"Obj\" />" +
                "        <option label=\"Sub\" value=\"Sub\" />" +
                "        </datalist>"+
                "    </td>\n" +
                "    <td class=\"due my-editable\">\n" +
                "        <input type=\"text\" name=\"due\" class=\"text\" pattern='\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}' required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 2rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>\n" +
                "<tr class=\"border-bottom-0 obj-question-row\" id=\"new-question-row\">\n" +
                "    <td colspan=\"4\" class=\"p-0 border-top-0\">\n" +
                "        <form class=\"collapse show\" action=\"\" id=\"new-question-form\" readonly=\"readonly\">\n" +
                "            <hr class=\"m-0 mx-3\">\n" +
                "            <div class=\"card-body py-3 question-container obj-question\">\n" +
                "                <span class=\"my-editable my-editable-obj-title\">\n" +
                "                    <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "                </span>\n" +
                "                <div class=\" mt-2 choice-container\">\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                "                    </div>\n" +
                "                    <div class=\"my-editable my-editable-obj-choice\">\n" +
                "                        <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                "                    </div>" +
                "                    <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                "                       <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                "                    </div>" +
                "                </div>\n" +
                "            </div>\n" +
                "            </div><button id=\"new-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn obj-question-list-add-btn\" style=\"\">Add New Question</button>\n" +
                "        </form>\n" +
                "    </td>\n" +
                "</tr>"
            );

            /*add the listener to new btns*/
            let newRow = $("#new-row");
            let newQuestionRow = $("#new-question-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#new-question-list-add-btn").on("click",function () {
                let tid = this.id.slice(0,-22);
                console.log(tid);
                $("#"+tid+"-question-list-add-btn").before("" +
                    "<hr class=\"m-0 mx-3\">\n" +
                    "<div class=\"card-body py-3 question-container obj-question\">\n" +
                    "    <span class=\"my-editable my-editable-obj-title\">\n" +
                    "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                    "    </span>\n" +
                    "    <div class=\" mt-2 choice-container\">\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                    "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                    "        </div>\n" +
                    "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                    "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                    "       </div>"+
                    "    </div>" +
                    "</div>"
                );
            });
            $("#new-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                console.log(json);
                $.ajax({
                    url:del_url+"?action=delete_quiz_list&tid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        $("#"+id+"-question-row").remove();
                        console.log(data);
                        console.log("deleted");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
            });
            $("#new-edt-btn").on("click",function () {
                if(!validForm("quiz-list-form")){
                    alert("Please complete the form");
                    return;
                }
                id = newRow.find("[name='tid']")[0].value;
                newRow.attr("id",""+id+"-row");
                newQuestionRow.attr("id",""+id+"-question-row").find("#new-question-form").attr("id","t"+id+"-question-form")
                    .find("#new-question-list-add-btn").attr("id",""+id+"-question-list-add-btn");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);

                $("#"+id+"-edt-btn").off("click");
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container obj-question\">\n" +
                        "    <span class=\"my-editable my-editable-obj-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "    <div class=\" mt-2 choice-container\">\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                        "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                        "       </div>"+
                        "    </div>" +
                        "</div>"
                    );
                });
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:add_url+"?action=add_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:edit_url+"?action=edit_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container obj-question\">\n" +
                        "    <span class=\"my-editable my-editable-obj-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "    <div class=\" mt-2 choice-container\">\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceA\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceB\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceC\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
                        "            <input type=\"text\" name=\"choiceD\" class=\"text\" required='required'>\n" +
                        "        </div>\n" +
                        "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
                        "           <input type=\"text\" name=\"std\" class=\"text\" pattern='[A,B,C,D]' required='required'>" +
                        "       </div>"+
                        "    </div>" +
                        "</div>"
                    );
                });
            });
        });
        $("#sub-test-add-btn").on("click",function () {
            if(!validForm("quiz-list-form")){
                alert("Please complete the form");
                return;
            }
            if($("#new-row")[0]){
                alert("Please finish the new quiz first");
                return;
            }
            $("#quiz-list-add-btn-row").before("" +
                "<tr id=\"new-row\">\n" +
                "    <th scope=\"row\" class=\"name\">\n" +
                "        <a href=\"#\" class=\"text-purple quiz-link text-sm my-editable\" data-toggle=\"collapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
                "            <input type=\"text\" name=\"tname\" class=\"text\" required='required'>\n" +
                "        </a>\n" +
                "    </th>\n" +
                "    <td class=\"tid my-editable\">\n" +
                "        <input type=\"number\" name=\"tid\" class=\"text\" required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"type my-editable text-capitalize\">\n" +
                "        <input type=\"text\" name=\"type\" class=\"text\" list=\"typeList\" required='required'>\n" +
                "        <datalist id=\"typeList\">" +
                "        <option label=\"Obj\" value=\"Obj\" />" +
                "        <option label=\"Sub\" value=\"Sub\" />" +
                "        </datalist>"+
                "    </td>\n" +
                "    <td class=\"due my-editable\">\n" +
                "        <input type=\"text\" name=\"due\" class=\"text\" pattern='\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}' required='required'>\n" +
                "    </td>\n" +
                "    <td class=\"edit-container\" style=\"width: 2rem\">\n" +
                "        <button id=\"new-edt-btn\" type=\"button\" class=\"btn btn-sm bg-blue px-3 text-white my-edt-btn bg-orange\">Save</button>\n" +
                "        <button id=\"new-del-btn\" type=\"button\" class=\"btn btn-sm bg-red px-3 text-white my-del-btn\" style=\"display: none;\">Delete</button>\n" +
                "    </td>\n" +
                "</tr>\n" +
                "<tr class=\"border-bottom-0 sub-question-row\" id=\"new-question-row\">\n" +
                "    <td colspan=\"4\" class=\"p-0 border-top-0\">\n" +
                "        <form class=\"collapse show\" action=\"\" id=\"new-question-form\" readonly=\"readonly\">\n" +
                "            <hr class=\"m-0 mx-3\">\n" +
                "            <div class=\"card-body py-3 question-container sub-question\">\n" +
                "                <span class=\"my-editable my-editable-sub-title\">\n" +
                "                    <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                "                </span>\n" +
                "            </div><button id=\"new-question-list-add-btn\" type=\"button\" class=\"btn btn-sm mx-4 mb-3 text-white bg-gray question-list-add-btn sub-question-list-add-btn\" style=\"\">Add New Question</button>\n" +
                "        </form>\n" +
                "    </td>\n" +
                "</tr>"
            );

            /*add the listener to sub btns*/
            let newRow = $("#new-row");
            let newQuestionRow = $("#new-question-row");
            let newSaveBtn = $("#new-edt-btn");
            let id = "new";
            $("#"+id+"-question-list-add-btn").on("click",function () {
                let tid = this.id.slice(0,-22);
                console.log(tid);
                $("#"+tid+"-question-list-add-btn").before("" +
                    "<hr class=\"m-0 mx-3\">\n" +
                    "<div class=\"card-body py-3 question-container sub-question\">\n" +
                    "    <span class=\"my-editable my-editable-sub-title\">\n" +
                    "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                    "    </span>\n" +
                    "</div>"
                );
            });
            $("#"+id+"-del-btn").on("click",function () {
                let id = this.id.slice(0,-8);
                console.log(id);
                let json = {};
                $.each($("#"+id+"-row .my-editable"), function (i, item) {
                    json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                });
                console.log(json);
                $.ajax({
                    url:del_url+"?action=delete_quiz_list&tid="+id,
                    type:"GET",
                    success:function(data){
                        alert("success");
                        $("#"+id+"-row").remove();
                        $("#"+id+"-question-row").remove();
                        console.log(data);
                        console.log("deleted");
                    },
                    error:function(){
                        alert("Connection error, please try again later");
                    }
                });
            });
            $("#"+id+"-edt-btn").on("click",function () {
                id = newRow.find("[name='tid']")[0].value;
                console.log(id);
                newRow.attr("id",""+id+"-row");
                newQuestionRow.attr("id",""+id+"-question-row").find("#new-question-form").attr("id",""+id+"-question-form")
                    .find("#new-question-list-add-btn").attr("id",""+id+"-question-list-add-btn");
                $(this).attr("id",""+id+"-edt-btn");
                $(this).next().attr("id",""+id+"-del-btn");
                console.log(id);

                $("#"+id+"-edt-btn").off("click");
                {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:add_url+"?action=add_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                }
                $("#"+id+"-edt-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    /*点击了edit*/
                    if($(this).html()==="Edit"){
                        $("#"+id+"-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type=\""+typelist[i]+"\" name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QA naming*/
                        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
                        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*QB naming*/
                        var qb_namelist = ["title"];
                        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
                            var value = $(this).html();
                            $(this).html("" +
                                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\" required='required'>"
                            );
                        });
                        /*button changing*/
                        $("#"+id+"-row input[name='tid']").attr("readonly",true);
                        $("#"+id+"-row input[name='type']").attr("readonly",true);
                        $("#"+id+"-row input[name='due']").attr("pattern","\\d{4}(\\/)\\d{1,2}\\1\\d{1,2}");
                        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
                        $("#t"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true);
                        $("#t"+id+"-question-form input[name='std']").attr("pattern","[A,B,C,D]");
                        $("#"+id+"-row .my-del-btn").hide();
                        $("#"+id+"-question-list-add-btn").show();
                        $(this).html("Save").toggleClass("bg-orange");
                    }
                    /*点击了save*/
                    else {
                        if(!validForm("quiz-list-form")){
                            alert("Please complete the form");
                            return;
                        }
                        let json = {};
                        /*test input*/
                        $.each($("#"+id+"-row .my-editable"), function (i, item) {
                            let input = item.children[0];
                            json[input.getAttribute("name")] = input.value;
                        });
                        /*QA input*/
                        let qa_list = [];
                        let cnt = 0;
                        $.each($("#"+id+"-question-row .obj-question"),function(){
                            let qa_json = {};
                            cnt++;
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qa_json[input.getAttribute("name")] = input.value;
                            });
                            qa_list.push(qa_json);
                        });
                        json["QA"] = qa_list;
                        /*QB input*/
                        let qb_list = [];
                        $.each($("#"+id+"-question-row .sub-question"),function(){
                            let qb_json = {};
                            $.each($(this).find(".my-editable"),function(j,item){
                                let input = item.children[0];
                                qb_json[input.getAttribute("name")] = input.value;
                            });
                            qb_list.push(qb_json);
                        });
                        json["QB"] = qb_list;
                        json["uid"] = uid;
                        json["cid"] = cid;
                        if(qa_list.length===0){
                            json["ttype"] = 1;
                            json["cnt"] = qb_list.length;
                        }
                        else {
                            json["ttype"] = 0;
                            json["cnt"] = qa_list.length;
                        }
                        console.log(json);
                        $.ajax({
                            url:edit_url+"?action=edit_user_list",
                            type:"POST",
                            data:json,
                            success:function(data){
                                alert("success");
                                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                                    let input = item.children[0];
                                    item.innerHTML=(input.value);
                                });
                                $("#"+id+"-row [data-toggle='collapse']").attr("href","#t"+id+"-question-form");
                                $("#t"+id+"-question-form").parent().attr({"colspan":5});
                                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                                $("#"+id+"-row .my-del-btn").show();
                                $("#"+id+"-question-list-add-btn").hide();
                                console.log(data);
                                console.log("submited");
                            },
                            error:function(){
                                alert("Connection error, item cannot be updated ,please try again later");
                            }
                        });
                    }
                });
                $("#"+id+"-del-btn").on("click",function () {
                    let id = this.id.slice(0,-8);
                    console.log(id);
                    let json = {};
                    $.each($("#"+id+"-row .my-editable"), function (i, item) {
                        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
                    });
                    console.log(json);
                    $.ajax({
                        url:del_url+"?action=delete_quiz_list&tid="+id,
                        type:"GET",
                        success:function(data){
                            alert("success");
                            $("#"+id+"-row").remove();
                            $("#"+id+"-question-row").remove();
                            console.log(data);
                            console.log("deleted");
                        },
                        error:function(){
                            alert("Connection error, please try again later");
                        }
                    });
                });
                $("#"+id+"-question-list-add-btn").on("click",function () {
                    let tid = this.id.slice(0,-22);
                    console.log(tid);
                    $("#"+tid+"-question-list-add-btn").before("" +
                        "<hr class=\"m-0 mx-3\">\n" +
                        "<div class=\"card-body py-3 question-container sub-question\">\n" +
                        "    <span class=\"my-editable my-editable-sub-title\">\n" +
                        "        <input type=\"text\" name=\"title\" class=\"text\" required='required'>\n" +
                        "    </span>\n" +
                        "</div>"
                    );
                });
            });
        });
    }
}


function edtBtnFunc() {
    let id = this.id.slice(0,-8);
    console.log(id);
    /*点击了edit*/
    if($(this).html()==="Edit"){
        $("#"+id+"-row .my-editable").each(function (i) {
            var value = $(this).html();
            $(this).html("" +
                "<input type='text' name=\""+ namelist[i] +"\" class='text' value=\""+ value +"\" required='required'>"
            );
        });
        /*QA naming*/
        var qa_namelist = ["title","choiceA","choiceB","choiceC","choiceD","std"];
        $("#"+id+"-question-row.obj-question-row .my-editable").each(function (i) {
            var value = $(this).html();
            $(this).html("" +
                "<input type='text' name=\""+ qa_namelist[i%6] +"\" class='text' value=\""+ value +"\">"
            );
        });
        /*QB naming*/
        var qb_namelist = ["title"];
        $("#"+id+"-question-row.sub-question-row .my-editable").each(function (i) {
            var value = $(this).html();
            $(this).html("" +
                "<input type='text' name=\""+ qb_namelist[i%1] +"\" class='text' value=\""+ value +"\">"
            );
        });
        /*button changing*/
        $("#"+id+"-row input[name='tid']").attr("readonly",true);
        $("#"+id+"-row input[name='type']").attr("readonly",true);
        $("#"+id+"-row [data-toggle='collapse']").attr("href","#");
        $("#"+id+"-question-form").attr({"readonly":true}).toggleClass("show",true).parent().attr({"colspan":4})
        $("#"+id+"-row .my-del-btn").hide();
        $("#"+id+"-question-list-add-btn").show();
        $(this).html("Save").toggleClass("bg-orange");
    }
    /*点击了save*/
    else {
        let json = {};
        /*test input*/
        $.each($("#"+id+"-row .my-editable"), function (i, item) {
            let input = item.children[0];
            json[input.getAttribute("name")] = input.value;
        });
        /*QA input*/
        let qa_list = [];
        let cnt = 0;
        $.each($("#"+id+"-question-row .obj-question"),function(){
            let qa_json = {};
            cnt++;
            $.each($(this).find(".my-editable"),function(j,item){
                let input = item.children[0];
                qa_json[input.getAttribute("name")] = input.value;
            });
            qa_list.push(qa_json);
        });
        json["QA"] = qa_list;
        /*QB input*/
        let qb_list = [];
        $.each($("#"+id+"-question-row .sub-question"),function(){
            let qb_json = {};
            $.each($(this).find(".my-editable"),function(j,item){
                let input = item.children[0];
                qb_json[input.getAttribute("name")] = input.value;
            });
            qb_list.push(qb_json);
        });
        json["QB"] = qb_list;
        json["uid"] = uid;
        json["cid"] = cid;
        if(qa_list.length===0){
            json["ttype"] = 1;
            json["cnt"] = qb_list.length;
        }
        else {
            json["ttype"] = 0;
            json["cnt"] = qa_list.length;
        }
        console.log(json);
        $.ajax({
            url:add_url+"?action=edit_user_list",
            type:"POST",
            data:json,
            success:function(data){
                alert("success");
                $.each($("#"+id+"-question-row .my-editable, #"+id+"-row .my-editable"), function (i, item) {
                    let input = item.children[0];
                    item.innerHTML=(input.value);
                });
                $("#"+id+"-row [data-toggle='collapse']").attr("href","#"+id+"-question-form");
                $("#"+id+"-question-form").parent().attr({"colspan":5});
                $("#"+id+"-row .my-edt-btn").html("Edit").toggleClass("bg-orange");
                $("#"+id+"-row .my-del-btn").show();
                $("#"+id+"-question-list-add-btn").hide();
                console.log(data);
                console.log("submited");
            },
            error:function(){
                alert("Connection error, item cannot be updated ,please try again later");
            }
        });
    }
}
function delBtnFunc() {
    let id = this.id.slice(0,-8);
    console.log(id);
    let json = {};
    $.each($("#"+id+"-row .my-editable"), function (i, item) {
        json[namelist[i]] = item.innerHTML.replace(/^\s+|\s+$/g,"");
    });
    console.log(json);
    $.ajax({
        url:del_url+"?action=delete_quiz_list&tid="+id,
        type:"GET",
        success:function(data){
            alert("success");
            $("#"+id+"-row").remove();
            $("#"+id+"-question-row").remove();
            console.log(data);
            console.log("deleted");
        },
        error:function(){
            alert("Connection error, please try again later");
        }
    });
}
function objQuestionAddBtn() {
    let tid = this.id.slice(0,-22);
    console.log(tid);
    $("#"+tid+"-question-list-add-btn").before("" +
        "<hr class=\"m-0 mx-3\">\n" +
        "<div class=\"card-body py-3 question-container obj-question\">\n" +
        "    <span class=\"my-editable my-editable-obj-title\">\n" +
        "        <input type=\"text\" name=\"title\" class=\"text\">\n" +
        "    </span>\n" +
        "    <div class=\" mt-2 choice-container\">\n" +
        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
        "            <input type=\"text\" name=\"choiceA\" class=\"text\">\n" +
        "        </div>\n" +
        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
        "            <input type=\"text\" name=\"choiceB\" class=\"text\">\n" +
        "        </div>\n" +
        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
        "            <input type=\"text\" name=\"choiceC\" class=\"text\">\n" +
        "        </div>\n" +
        "        <div class=\"my-editable my-editable-obj-choice\">\n" +
        "            <input type=\"text\" name=\"choiceD\" class=\"text\">\n" +
        "        </div>\n" +
        "        <div class=\"mt-2 my-editable my-editable-obj-choice my-editable-obj-std\">\n" +
        "           <input type=\"text\" name=\"std\" class=\"text\">" +
        "       </div>"+
        "    </div>" +
        "</div>"
    );
}
function subQuestionAddBtn() {
    let tid = this.id.slice(0,-22);
    console.log(tid);
    $("#"+tid+"-question-list-add-btn").before("" +
        "<hr class=\"m-0 mx-3\">\n" +
        "<div class=\"card-body py-3 question-container sub-question\">\n" +
        "    <span class=\"my-editable my-editable-sub-title\">\n" +
        "        <input type=\"text\" name=\"title\" class=\"text\">\n" +
        "    </span>\n" +
        "</div>"
    );
}
// render the quiz
var uid = getCookie('uid');
var cid = getCookie('cid');
var uType = getCookie('type');

/*render quiz list*/
function renderQuiz(data_url,sub_QA_url,sub_QB_url) {
    /*load the quiz list*/

    data_url="../php/student_quiz_list.php";
    sub_QA_url = "../php/submit_answer.php";
    sub_QB_url="../php/save_QB.php";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState===4 && xmlHttp.status===200)
        {
            let data = xmlHttp.responseText;
            console.log(data);
            data = JSON.parse(data);
            console.log(data);
            createQuiz(data);

            console.log("quiz rendered");
        }
    };
    xmlHttp.open("GET",data_url+"?uid="+uid+"&cid="+cid,false);
    xmlHttp.send();

    function createQuiz(data) {

        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                let cQuiz = document.getElementById("quiz-table");
                let quiz = data[i];

                var tid = quiz.tid;
                let tname = quiz.tname;
                let tdue = quiz.due;
                let tstatus = (quiz.status === 'Done')?'Done':(quiz.status  === 'Not Done')?'Not Done':'Out of Date';

                let score_total = quiz.score_total;
                let score_gained = quiz.score_gained;

                // create quiz title
                let td_list = [];
                td_list.push("" +
                    "<th scope=\"row\" class=\"name\">\n" +
                    "    <div class=\"align-items-center\">\n" +
                    "        <a href=\"#t" + tid + "\" class=\"text-purple quiz-link\" data-toggle=\"collapse\"  role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n" +
                    "            <span class=\"mb-0 text-sm\">"+ tname +"</span>\n" +
                    "        </a>\n" +
                    "    </div>\n" +
                    "</th>");
                td_list.push("" +
                    "<td class=\"due\">\n" +
                    tdue +
                    "</td>");
                td_list.push("" +
                    "<td class=\"score\">\n" +
                    score_gained +
                    "</td>");
                td_list.push("" +
                    "<td class=\"out-of\">\n" +
                    score_total +
                    "</td>");
                td_list.push("" +
                    "<td class=\"status\">\n" +
                    "    <span class=\"badge badge-dot mr-4\">\n" +
                    "        <i class=\"" + ((tstatus === 'Done') ? "bg-green" : "bg-red") + "\"></i>" + tstatus + "\n" +
                    "    </span>\n" +
                    "</td>");
                $("#quiz-table").append("<tr id=\""+ tid +"-row\"></tr>");
                $("#quiz-table tr:last").append(td_list);
                if(uType==="student"){
                    createQuestionStudent(quiz.QA,"mul");
                    createQuestionStudent(quiz.QB,"file");
                    if(tstatus !== 'Not Done'){
                        $("#t"+tid +" input").attr("disabled",true);
                        $("#t"+tid +" :submit").remove();
                        $("#t"+tid +" .dropzone").remove();
                    }
                }
                else if(uType==="teacher"){
                    createQuestionTeacher(quiz.QA,"mul");
                    createQuestionTeacher(quiz.QB,"file");
                    {
                        $("#t"+tid +" input").attr("disabled",true);
                        $("#t"+tid +" :submit").remove();
                        $("#t"+tid +" .dropzone").remove();
                    }
                }

            }
        }
        function createQuestionStudent(data,type){
            console.log(uType);
            console.log(data);
            // alert("asd");
            // console.log(typeof data.length);
            if(!data)
                return;
            // data = JSON.parse(data);

            /*obj question render*/
            if(type==="mul" && data.length>0){
                var q_list = [];
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {

                        let question = data[i];
                        // console.log(question);
                        let title = question.title;
                        let choice = [question.choiceA,question.choiceB,question.choiceC,question.choiceD];
                        let score = question.score;
                        let chose = ["","","",""];
                        let chose_index = 0;
                        if(question.ans==='B') {
                            chose_index = 1;
                        }else if(question.ans==='C'){
                            chose_index = 2;
                        }else if(question.ans==='D'){
                            chose_index = 3;
                        }
                        // chose[(question.chose)?(question.chose===-1)?0:question.chose:0]="checked";
                        chose[chose_index]="checked";

                        q_list.push("<hr class=\"m-0 mx-3\">");
                        q_list.push("" +
                            "<div class=\"card-body py-3 question-container\">\n" +
                            "    <span id=\""+ tid +"-q"+i+"-title\">\n" +
                            "    <span id=\""+ tid +"-q"+i+"-title\">\n" +
                            title + "<span class=\"badge badge-pill bg-gradient-green text-white question-badge\" style=\"float: right; "+ ((score===-1)?"display: none;":"") +"\">"+ score +"</span>"+
                            "    </span>\n" +
                            "    <div class=\" mt-2 choice-container\">\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"0" +"\" "+chose[0]+" value=\"A\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for=\""+ tid+"-q"+ i+"0" +"\">A. "+ choice[0] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"1" +"\" "+chose[1]+" value=\"B\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"1" +">B. "+ choice[1] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"2" +"\" "+chose[2]+" value=\"C\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"2" +">C. "+ choice[2] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"3" +"\" "+chose[3]+" value=\"D\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"3" +">D. "+ choice[3] +"</label>\n" +
                            "        </div>\n" +
                            "    </div>\n" +
                            "</div>");
                    }
                }
                $("#quiz-table").append("" +
                    "<!--collapse tr-->" +
                    "<tr class=\"border-bottom-0\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\" >\n" +
                    "        <form class=\"collapse obj-form\" action=\"\" id=\"t"+ tid +"\">\n" +
                    "            <input class=\"btn-sm bg-purple text-white border-0 m-0 mb-3 ml-4 px-2\" type=\"submit\" value=\"SUBMIT\">\n" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#t"+tid).prepend(q_list);

                //ajax
                setSubmitAction();



            }
            /*sub question render*/
            else if(data.length>0) {
                console.log("this is QB"+data);
                var q_list = [];
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        let question = data[i];
                        let title = question.title;
                        let score = question.score;
                        q_list.push("<hr class=\"m-0 mx-3\">");
                        q_list.push("" +
                            "<div class=\"card-body py-3 question-container\">\n" +
                            "    <span>\n" +
                            title +
                            "    </span>\n" +
                            "</div>");
                    }
                }
                $("#quiz-table").append("" +
                    "<!--collapse tr-->\n" +
                    "<tr class=\"border-bottom-0\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\" >\n" +
                    "        <form class=\"collapse sub-form\" action=\"\" id=\"t"+ tid +"\">\n" +
                    "            <div class=\"dropzone card my-dropzone mx-4 my-3 align-items-center\" data-toggle=\"dropzone\" data-dropzone-url=\""+"http://192.168.2.114:8080/phptest/test.php"+"\">\n" +
                    "                <div class=\"fallback\">" +
                    "                   <div class=\"d-flex align-self-center mt-4\">" +
                    "                       <input type=\"file\" class=\"fallback-input\" id=\"dropzoneBasicUpload\">\n" +
                    "                       <button type=\"submit\" class=\"\">Submit</button>\n" +
                    "                   </div>"+
                    "                </div>\n" +
                    "            </div>" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#t"+tid).prepend(q_list);
                $("#t"+tid).find('.dropzone').dropzone({
                    url: sub_QB_url,
                    method:"POST",
                    paramName:"ans",
                    maxFiles:1,
                    acceptedFiles:".doc,.docx",
                    params: {"tid":tid,"uid":uid,"cid":cid},
                    init:function(){
                        this.on("success", function(file, data) {
                            console.log(data);
                            data = JSON.parse(data);
                            let tid = data.tid;
                            let flag = (data.flag==="true");
                            console.log(data);
                            console.log(flag);
                            console.log(tid);
                            /*debugging*/
                            // let tid = 9901;
                            // let flag = true;
                            if(flag) {
                                console.log(tid);
                                alert("File has been uploaded");
                                console.log(tid);
                                $("#"+tid +"-row .status span").html("<i class=\"bg-green\"></i>Done");
                                // $("#"+tid +"-row .score").text(data.score_gained);
                                $("#"+tid +"-row .score").text("----");
                                $("#t"+tid +" input").attr("disabled",true);
                                $("#t"+tid +" :submit").remove();
                                $("#t"+tid+" .dropzone").remove();

                            }
                            else {
                                alert("Something went wrong, please refresh! (Ctrl + F5)");
                            }
                        });
                    }
                });

            }
        }
        function createQuestionTeacher(data,type){
            console.log(uType);
            console.log(data);
            // alert("asd");
            // console.log(typeof data.length);
            if(!data)
                return;
            // data = JSON.parse(data);

            /*obj question render*/
            if(type==="mul" && data.length>0){
                var q_list = [];
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {

                        let question = data[i];
                        // console.log(question);
                        let title = question.title;
                        let choice = [question.choiceA,question.choiceB,question.choiceC,question.choiceD];
                        let score = question.score;
                        let chose = ["","","",""];
                        let chose_index = 0;
                        if(question.ans==='B') {
                            chose_index = 1;
                        }else if(question.ans==='C'){
                            chose_index = 2;
                        }else if(question.ans==='D'){
                            chose_index = 3;
                        }
                        // chose[(question.chose)?(question.chose===-1)?0:question.chose:0]="checked";
                        chose[chose_index]="checked";

                        q_list.push("<hr class=\"m-0 mx-3\">");
                        q_list.push("" +
                            "<div class=\"card-body py-3 question-container\">\n" +
                            "    <span id=\""+ tid +"-q"+i+"-title\">\n" +
                            "    <span id=\""+ tid +"-q"+i+"-title\">\n" +
                            title + "<span class=\"badge badge-pill bg-gradient-green text-white question-badge\" style=\"float: right; "+ ((score===-1)?"display: none;":"") +"\">"+ score +"</span>"+
                            "    </span>\n" +
                            "    <div class=\" mt-2 choice-container\">\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"0" +"\" "+chose[0]+" value=\"A\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for=\""+ tid+"-q"+ i+"0" +"\">A. "+ choice[0] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"1" +"\" "+chose[1]+" value=\"B\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"1" +">B. "+ choice[1] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"2" +"\" "+chose[2]+" value=\"C\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"2" +">C. "+ choice[2] +"</label>\n" +
                            "        </div>\n" +
                            "        <div class=\"custom-control custom-radio\">\n" +
                            "            <input name=\""+ tid+"-"+ i +"\" class=\"custom-control-input\" id=\""+ tid+"-q"+ i+"3" +"\" "+chose[3]+" value=\"D\" type=\"radio\">\n" +
                            "            <label class=\"custom-control-label\" for="+ tid+"-q"+ i+"3" +">D. "+ choice[3] +"</label>\n" +
                            "        </div>\n" +
                            "    </div>\n" +
                            "</div>");
                    }
                }
                $("#quiz-table").append("" +
                    "<!--collapse tr-->" +
                    "<tr class=\"border-bottom-0\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\" >\n" +
                    "        <form class=\"collapse obj-form\" action=\"\" id=\"t"+ tid +"\">\n" +
                    "            <input class=\"btn-sm bg-purple text-white border-0 m-0 mb-3 ml-4 px-2\" type=\"submit\" value=\"SUBMIT\">\n" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#t"+tid).prepend(q_list);

                //ajax
                setSubmitAction("http://192.168.2.114:8080/phptest/get_ans.php");



            }
            /*sub question render*/
            else if(data.length>0) {
                console.log("this is QB"+data);
                var q_list = [];
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        let question = data[i];
                        let title = question.title;
                        let score = question.score;
                        q_list.push("<hr class=\"m-0 mx-3\">");
                        q_list.push("" +
                            "<div class=\"card-body py-3 question-container\">\n" +
                            "    <span>\n" +
                            "    <a class='sub-stu-link' href='"+title+"'>" +
                            title +
                            "    </a>"+
                            "    </span>\n" +
                            "</div>");
                    }
                }
                $("#quiz-table").append("" +
                    "<!--collapse tr-->\n" +
                    "<tr class=\"border-bottom-0\">\n" +
                    "    <td colspan=\"5\" class=\"p-0 border-top-0\" >\n" +
                    "        <form class=\"collapse sub-form\" action=\"\" id=\"t"+ tid +"\">\n" +
                    "            <div class=\"dropzone card my-dropzone mx-4 my-3 align-items-center\" data-toggle=\"dropzone\" data-dropzone-url=\""+"http://192.168.2.114:8080/phptest/test.php"+"\">\n" +
                    "                <div class=\"fallback\">" +
                    "                   <div class=\"d-flex align-self-center mt-4\">" +
                    "                       <input type=\"file\" class=\"fallback-input\" id=\"dropzoneBasicUpload\">\n" +
                    "                       <button type=\"submit\" class=\"\">Submit</button>\n" +
                    "                   </div>"+
                    "                </div>\n" +
                    "            </div>" +
                    "        </form>\n" +
                    "    </td>\n" +
                    "</tr>");
                $("#t"+tid).prepend(q_list);
                $("#t"+tid).find('.dropzone').dropzone({
                    url: "../test.php",
                    method:"POST",
                    paramName:"file",
                    acceptedFiles:".doc,.docx",
                    maxFiles:1,
                    params: {"tid": tid},
                    init:function(){
                        this.on("success", function(file, data) {
                            console.log(data);
                            // data = JSON.parse(data);
                            // let tid = data.tid;
                            // let flag = (data.flag==="true");
                            let tid = 9901;
                            let flag = true;
                            if(flag) {
                                alert("File has been uploaded");
                                $("#"+tid +"-row .status span").html("<i class=\"bg-green\"></i>Done");
                                // $("#"+tid +"-row .score").text(data.score_gained);
                                $("#"+tid +"-row .score").text("----");
                                $("#t"+tid +" input").attr("disabled",true);
                                $("#t"+tid +" :submit").remove();
                                $("#t"+tid+" .dropzone").remove();

                            }
                            else {
                                alert("Something went wrong, please refresh! (Ctrl + F5)");
                            }

                        });
                    }
                });

            }
        }
        function setSubmitAction(url) {
            $("form.obj-form").on('submit',function (e) {
                e.preventDefault();
                let tid = this.id.slice(1);
                let values = {};
                values["uid"] = uid;
                values["cid"] = cid;
                values["tid"] = tid;
                let ans = "";
                let cnt = 0;
                $.each($("#t"+tid).serializeArray(), function (i, field) {
                    // values[field.name] = field.value;
                    ans+=field.value;
                    cnt++;
                });
                values["cnt"] = cnt;
                values["ans"] = ans;
                // alert(values);

                // let url = "http://49.140.92.61:8080/phptest/submit_answer.php";

                $.ajax({
                    url:sub_QA_url+"?action=submit_obj_test",
                    type:"POST",
                    data:values,
                    success:function(data){
                        console.log("1 success");
                        // console.log(values);
                        console.log(data);
                        data = JSON.parse(data);
                        console.log(data);
                        console.log("submited");
                        let tid = data.tid;
                        let flag = (data.flag==="true");
                        console.log(flag);
                        // let flag = true;
                        if(flag) {
                            $("#"+tid +"-row .status span").html("<i class=\"bg-green\"></i>Done\n");
                            $("#"+tid +"-row .score").text(data.score_gained);
                            $("#t"+tid +" input").attr("disabled",true);
                            // $("#t"+tid +" :radio").attr("checked",false);
                            $("#t"+tid +" :submit").remove();
                            let q_list = data.QA;
                            console.log(q_list);
                            $.each(q_list,function (i,field) {
                                // $("#"+tid +"-q"+i+q_list[i].chose).attr("checked",true);
                                $("#"+tid +"-q"+i+"-title .question-badge").text(q_list[i].score);
                            });
                        }
                        else {
                            alert("Something went wrong on your browser, the server cannot get you answers, please try again or refresh! (Ctrl + F5)");
                        }

                    },
                    error:function(){
                        alert("error");
                    }
                });
            });
            $("form.sub-form").on('submit',function (e) {
                e.preventDefault();
                let tid = this.id.slice(1);
                let fd = new FormData();

                fd.append("uid",uid);
                fd.append("cid",cid);
                fd.append("tid",tid);
                fd.append("ans",$(this).find("input")[0].files[0]);
                $.ajax({
                    url:submit_QB_url+"?action=submit_sub_test",
                    type:"POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success:function(data){
                        data = JSON.parse(data);
                        let tid = data.tid;
                        let flag = (data.flag==="true");

                        // let flag = true;
                        if(flag){
                            console.log("2 success");
                            console.log(data);
                            console.log("submited");
                            $("#"+tid +"-row .status span").html("<i class=\"bg-green\"></i>Done\n");
                            $("#"+tid +"-row .score").text(data.score_gained);
                            $("#t"+tid +" input").attr("disabled",true);
                            // $("#t"+tid +" :radio").attr("checked",false);
                            $("#t"+tid +" :submit").remove();
                            $("#t"+tid+" .dropzone").remove();
                        }
                        else {
                            alert("Something went wrong, please refresh! (Ctrl + F5)");
                        }
                    },
                    error:function(){
                        alert("Connection error, item cannot be update ,please try again later");
                    }
                });
                console.log(fd);
            });
        }
    }
}


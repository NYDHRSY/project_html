
var uid = getCookie('uid');
console.log(uid);


//render Course on Dashboard
function renderDashboardCourses(url) {
    // url = "../php/dashboard.php";
    loadDataDashboardCourses(url);
    function loadDataDashboardCourses(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                data = JSON.parse(data);
                createDashboardCourses(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid,true);
        xmlHttp.send();
    }
    function createDashboardCourses(data) {
        for(var i in data) {
            if (data.hasOwnProperty(i)) {
                let course = data[i];
                let cid = course.cid;
                let ctitle = course.ctitle;
                let ctext = course.ctext;
                let cover_url = course.cover_url;
                let link = course.href;
                $("#course-container").append("" +
                    "<div class=\"col-10 col-sm-6 col-xl-4 offset-1 offset-sm-0 p-3 course_container\">\n" +
                    "    <a href=\"Course_Home.html\" id=\""+cid+"\">\n" +
                    "        <div class=\"card border-0 shadow--hover\">\n" +
                    "            <img class=\"card-img-top\" src=\""+ cover_url +"\" alt=\""+ ctitle +"\">\n" +
                    "            <div class=\"card-body p-2 px-3\">\n" +
                    "                <h4 class=\"card-title\">"+ ctitle +"</h4>\n" +
                    "                <p class=\"card-text\">"+ ctext +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </a>\n" +
                    "</div>"
                );
                $(".course_container a").on('click',function () {
                    setCookie('cid',this.id);
                });
            }
        }
    }
}

//render todolist on Dashboard
function renderDashboardTodo(url) {
    // url = "../php/todolist.php";
    loadDataDashboardTodo(url);
    function loadDataDashboardTodo(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                data = JSON.parse(data);
                createDashboardTodo(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid,true);
        xmlHttp.send();
    }
    function createDashboardTodo(data) {
        for(var i in data) {
            if (data.hasOwnProperty(i)) {
                let todo = data[i];
                let todo_title = todo.tname;
                let todo_due = todo.deadline;
                $("#todo").append("" +
                    "<li class=\"list-group-item align-content-center px-3\">\n" +
                    "    <div class=\"list-text\">\n" +
                            todo_title +
                    "    </div>\n" +
                    "    <span class=\"float-left mt-2 text-gray list-due\">\n" +
                            todo_due +
                    "    </span>\n" +
                    "</li>");
            }
        }

    }
}

//render Course
// function renderCourses(url) {
//     url = "../php/dashboard.php";
//     loadDataCourses(url);
//     console.log("courses rendered");
//     function loadDataCourses(url) {
//         let xmlHttp = new XMLHttpRequest();
//         xmlHttp.onreadystatechange = function () {
//             if (xmlHttp.readyState===4 && xmlHttp.status===200)
//             {
//                 let data=xmlHttp.responseText;
//                 // alert(data);
//                 console.log(data);
//                 createCourses1(data);
//             }
//         };
//         xmlHttp.open("GET",url+"?uid="+uid,true);
//         xmlHttp.send();
//     }
//     function createCourses1(data) {
//         let cCourses = document.getElementById("course-container");
//         let coursesData = JSON.parse(data);
//         // alert(coursesData);
//         for(var i in coursesData){
//             if(coursesData.hasOwnProperty(i)){
//                 let course = coursesData[i];
//                 let h4 = document.createElement("h4");
//                 h4.className = "card-title";
//                 h4.innerHTML = course.ctitle;
//                 let p = document.createElement("p");
//                 p.className = "card-text";
//                 p.innerHTML = course.ctext;
//                 let div = document.createElement("div");
//                 div.className = "card-body p-2 px-3";
//                 let img = document.createElement("img");
//                 img.className = "card-img-top";
//                 img.src = course.cover_url;
//                 let a = document.createElement("a");
//                 a.href = course.href;
//                 a.id = course.cid;
//                 let div_card = document.createElement("div");
//                 div_card.className = "card border-0 shadow--hover";
//                 let course_container = document.createElement("div");
//                 course_container.className = "col-10 col-sm-6 col-lg-4 col-xl-3 col-xxl-5item p-3 offset-1 offset-sm-0 course_container";
//
//                 div.appendChild(h4);
//                 div.appendChild(p);
//                 div_card.appendChild(img);
//                 div_card.appendChild(div);
//                 a.appendChild(div_card);
//                 course_container.appendChild(a);
//                 cCourses.appendChild(course_container);
//                 $(".course_container a").on('click',function () {
//                     setCookie('cid',this.id);
//                 });
//             }
//             if(window.width<576)
//                 cCourses.firstElementChild.className += " mt-3";
//         }
//     }
// }
function renderCourses(url) {
    // url = "../php/dashboard.php";
    loadDataCourses(url);
    function loadDataCourses(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                data = JSON.parse(data);
                createCourses(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid,true);
        xmlHttp.send();
    }
    function createCourses(data) {
        let course_selected = [];
        for(var i in data) {
            if (data.hasOwnProperty(i)) {
                let course = data[i];
                let cid = course.cid;
                let ctitle = course.ctitle;
                let ctext = course.ctext;
                let cover_url = course.cover_url;
                let link = course.href;

                course_selected.push(cid);

                $("#course-container").append("" +
                    "<div class=\"col-10 col-sm-6 col-lg-4 col-xl-3 col-xxl-5item p-3 offset-1 offset-sm-0 course_container\">\n" +
                    "    <a href=\"Course_Home.html\" id=\""+cid+"\">\n" +
                    "        <div class=\"card border-0 shadow--hover\">\n" +
                    "            <img class=\"card-img-top\" src=\""+ cover_url +"\" alt=\""+ ctitle +"\">\n" +
                    "            <div class=\"card-body p-2 px-3\">\n" +
                    "                <h4 class=\"card-title\">"+ ctitle +"</h4>\n" +
                    "                <p class=\"card-text\">"+ ctext +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </a>\n" +
                    "</div>"
                );
                $(".course_container a").on('click',function () {
                    setCookie('cid',this.id);
                });
            }
        }
        setCookie('courseList',course_selected);
    }
}

function renderCoursesSelectingList(url) {
    let uid = getCookie('uid');
    let data_url = "../php/student_select_course.php";
    let sub_select_url = "../php/select_course.php";
    let courseList = getCookie('courseList');
    console.log(courseList);
    loadDataCoursesSelectList(url);
    function loadDataCoursesSelectList(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                data = JSON.parse(data);
                createCoursesSelectList(data);
            }
        };
        xmlHttp.open("GET",data_url+"?action=get_courses_select_data",true);
        xmlHttp.send();
    }
    function isCourseSelected(cid,courseList) {
        // courseList = courseList||course_selected;
        // console.log(cid);
        // console.log(courseList);
        if(courseList.indexOf(cid)>-1){
            return true;
        }
        else {
            return false;
        }
    }
    function createCoursesSelectList(data) {
        for(var i in data) {
            if (data.hasOwnProperty(i)) {
                let course = data[i];
                let cid = course.cid;
                let ctitle = course.ctitle;
                $("#course-select-list").append("" +
                    "<li class=\"checklist-entry list-group-item flex-column align-items-start py-3 px-4\" id=\""+cid+"-item\">\n" +
                    "    <div class=\"checklist-item\">\n" +
                    "        <div class=\"checklist-info\">\n" +
                    "            <a href=\"Course_Home.html\" class=\"font-weight-600\" id=\""+cid+"-link\">\n" +
                    ctitle +
                    "            </a>\n" +
                    "        </div>\n" +
                    "        <div>\n" +
                    "            <div class=\"custom-control custom-checkbox custom-checkbox-success\">\n" +
                    "                <input class=\"custom-control-input\" id=\""+cid+"\" type=\"checkbox\" name=\"course[]\" "+(isCourseSelected(cid,courseList)?"checked":"")+">\n" +
                    "                <label class=\"custom-control-label\" for=\""+cid+"\"></label>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</li>\n"
                );
            }
        }
        $("#course-select-list a").on('click',function () {
            setCookie('cid',this.id.slice(0,-5));
        });
    }
    $(".course-select-form").on('submit',function (e) {
        e.preventDefault();
        let courses = ["DontRead"];
        // courses.push();
        $("input[name='course\[\]']:checked").each(function(i){//把所有被选中的复选框的值存入数组
            courses.push($(this).attr('id'));
        });
        console.log(courses);

        $.ajax({
            url:sub_select_url+"?action=submit_selected_courses",
            type:"POST",
            data:{
                'uid':uid,
                'course':courses
            },
            success:function(data){
                console.log("submited");
                console.log(data);
                data = JSON.parse(data);
                let flag = (data.flag==="true");
                console.log(flag);
                if(flag) {
                    console.log(data);
                    alert("Success updating your courses selection");
                    window.location.href="./Course.html";
                }
                else {
                    alert("Something went wrong on your browser, the server cannot get you selection, please try again or refresh! (Ctrl + F5)");
                }
            },
            error:function(){
                alert("Connection error");
            }
        });
        // alert($(this).serialize());
    })

}

//render the md file
function renderMd(url){
    var cid = getCookie('cid');
    // console.log("cid");
    // console.log(cid);
    // console.log(uid);
    loadDataMd(url);
    function loadDataMd(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                loadFile(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid+"&cid="+cid,true);
        xmlHttp.send();
    }
    console.log("md file rendered");
    function loadFile(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                document.getElementsByClassName("markdown-container")[0].innerHTML = marked(data);
            }
        };
        xmlHttp.open("GET",url,true);
        xmlHttp.send();
    }
}
//render static md file
function renderMd2(url){
    loadDataMd(url);
    function loadDataMd(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                document.getElementsByClassName("markdown-container")[0].innerHTML = marked(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid,true);
        xmlHttp.send();
    }
    console.log("md file rendered");
}

function CourseEditRulesAlert() {
    /*never checked the input*/
    if(getCookie('CourseDontShowAgain')==='') {
        $('#course-modal').modal('show').on('hide.bs.modal',function() {
            /*Dont show is checked*/
            if($("#courseDontShowAgain:checked")[0]){
                setCookie("CourseDontShowAgain",true,30);
                alert('Be sure that you read all information!');
            }
            // else {
            //     setCookie("CourseDontShowAgain","",30);
            // }
        });
    }
}
function quizEditRulesAlert() {
    /*never checked the input*/
    if(getCookie('quizDontShowAgain')==='') {
        $('#quiz-modal').modal('show').on('hide.bs.modal',function() {
            /*Dont show is checked*/
            if($("#quizDontShowAgain:checked")[0]){
                setCookie("quizDontShowAgain",true,30);
                alert('Be sure that you read all information!');
            }
            // else {
            //     setCookie("CourseDontShowAgain","",30);
            // }
        });
    }
}
function validForm(formID) {
    let flag = true;
    $("#"+formID+" input").each(function (i,item) {
        flag = flag && item.validity.valid;
        // if(!item.validity.valid){
        //     if(item.validity.valueMissing){
        //         item.setCustomValidity("Input cannot be empty!");
        //     }else if(item.validity.patternMismatch){
        //         item.setCustomValidity("Input pattern are not acceptable! Please read the help file.");
        //     }else if(item.validity.typeMismatch){
        //         item.setCustomValidity("Input type are not acceptable! Please read the help file.");
        //     }
        // }
    });
    return flag;
}
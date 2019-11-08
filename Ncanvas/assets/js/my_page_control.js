function setCookie(cname,cvalue,exdays)
{
    exdays = exdays||1;
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=./";
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

var uid = getCookie('uid');
var uType = getCookie('type');
var cid = getCookie('cid');
var head = getCookie('head');
var name = getCookie('name');
// var head = "../assets/file/head.png";
// var name = "ZHSJ";

function isLogin() {
    console.log(getCookie('uid'));
    return (getCookie('uid')!=='');
}
function isAuth(tType) {
    let uType = getCookie('type');
    return isLogin() && (tType==="t&s")?(uType==="student"||uType==="teacher"):uType===tType;
}
function pageLocateInit(tType) {
    if(!isAuth(tType)){
        /*用户权限验证失败，强制跳转登录*/

        /*及时跳转*/
        window.location.href = "./Login.html";
        /*fallback，页面href跳转*/
        $(document).ready(function () {
            $("a").attr("href","./Login.html");
        });
    }
    else {
        $(document).ready(function () {
            pageRelocate();
        });
    }

}

/*.navbar-nav*/
function pageRelocate() {
    /*debugging*/
    // let uType = 'student';

    let uType = getCookie('type');
    if(uType==='admin'){
        /*the user is an admin, run with the root*/
        $(".navbar-nav a.dash-link").attr("href","./Admin_Dashboard.html");
        $(".navbar-nav a.course-link").attr("href","./Admin_Course.html");
        $(".navbar-nav a.course-quiz-link").attr("href","./Admin_Course_Quiz.html");
    }
    else if(uType==='teacher') {
        $(".navbar-nav a.dash-link").attr("href","./Dashboard.html");
        $(".navbar-nav a.course-link").attr("href","./Teacher_Course.html");
        $(".navbar-nav a.course-quiz-link").attr("href","./Teacher_Course_Quiz.html");
    }
    else if(uType==='student'){
        $(".navbar-nav a.dash-link").attr("href","./Dashboard.html");
        $(".navbar-nav a.course-link").attr("href","./Course.html");
        $(".navbar-nav a.course-quiz-link").attr("href","./Course_Quiz.html");
    }
}
function renderUserData() {
    $(document).ready(function() {
        $(".nav-link .media .avatar img").attr({
            "src": head,
            "alt": name
        });
        $(".nav-link .media .media-body span").html(name);
    });
}
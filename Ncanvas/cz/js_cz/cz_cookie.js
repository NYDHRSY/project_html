function setCookie(cname,cvalue,exdays)
{
    var domain = '.'+location.host;
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=../"//"; path=/htdocs/Group1/Canvas/";///htdocs/Group1/Ncanvas1.1/
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

// function checkCookie()
// {
//     var username=getCookie("username");
//     var psw=getCookie("psw");
//     if (username!="")
//     {
//         alert("Welcome again " + username);
//         login_jump(username,psw);
//     }
//     else
//     {
//         // username = prompt("Please enter your name:","");
//         // if (username!="" && username!=null)
//         // {
//         //     setCookie("username",username,365);
//         // }
//         alert("Enter your username and password again because there is no cookie!");
//     }
// }



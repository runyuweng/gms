import cookie from "js-cookie";
import fetch from 'isomorphic-fetch';

module.exports = {
	// login(username,pass,cb){
	// 	console.log(username,pass);
	// },
    logout(cb){
        cb();
    },


    setCookie(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    },
    delCookie(name)
    {
        var cval;
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        cval=unescape(arr[2]);
        else
        cval=null;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        // var cval=getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}

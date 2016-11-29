import cookie from "js-cookie";
import fetch from 'isomorphic-fetch';

module.exports = {

	login(username,pass,cb){
		console.log(username,pass);
	},
            logout(cb){
                            cb();
            }
}

var express = require('express');
var router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const user = require("../controller/user");

//router -> [POST]signup/(회원 가입)
router.post('/', (req, res)=>{
    const{ id, pwd, name, nick, email } = req.body;
    //id, name, nickname, email 값들이 다 잘 들어왔는지 확인
    if(!id || !name || !nick || !email || !pwd ){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var uid = () => {
        var id="";
        // length of ID : 0 ~ 8
        var length = Math.floor(Math.random() * 8) + 1;
        for(var i=0; i<length; i++) {
            id += options.charAt(Math.floor(Math.random() * 62));
        }
        return id;
    };
    var code = String(uid());
    user.signup(id, pwd, name, nick, email, code)
    .then(({code, json}) => {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;

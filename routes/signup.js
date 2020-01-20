var express = require('express');
var router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const user = require("../controller/user");

//router -> [POST]signup/(회원 가입)
router.post('/', (req, res)=>{
    const{ id, pw, name, nickname, email, code } = req.body;
    //id, name, nickname, email 값들이 다 잘 들어왔는지 확인
    if(!id || !name || !nickname || !email || !pw || !code){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    user.signup(id, pw, name, nickname, email, code)
    .then(({code, json}) => {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;

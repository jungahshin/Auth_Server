var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var statusCode = require('../module/statusCode');
var util = require('../module/utils');
var resMessage = require('../module/responseMessage');
var nodemailer = require('nodemailer');
var mail = require('../controller/mail');

//입력받은 id가 유효한지 확인 후, 존재하는 id면 그 id의 email로 메일 전송(내용->랜덤 코드)
router.post('/', (req, res)=>{
    const{ email, code } = req.body;//이 id로 메일 전송하기
    if(!email || !code){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    mail.send(email, code)
    .then(({code, json}) => {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

//메일 코드가 유효한지 검사(id에 해당하는 code와 받은 code가 일치하는 지)하고 일치하면 user테이블에서 verified '1'로 수정
router.post('/code', (req, res)=>{
    const{ id, code } = req.body;//이 id로 메일 전송하기
    if(!id || !code){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    mail.verify(id, code)
    .then(({code, json}) => {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

router.post('/find', (req, res)=>{
    const{ id } = req.body;//이 id로 메일 전송하기
    if(!id){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    mail.send_pw(id)
    .then(({code, json}) => {
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var statusCode = require('../module/statusCode');
var util = require('../module/utils');
var resMessage = require('../module/responseMessage');

router.post('/', (req, res)=>{
    const {id, pw} = req.body;
    //id, pw 둘다 값이 잘 들어왔는지 확인
    if(!id || !pw){
        res.status(statusCode.OK).send(util.successFalse(statusCode.NO_CONTENT, resMessage.NULL_VALUE));
        return;
    }
    if(id == 'admin' && pw == 'admin'){//관리자 계정
        res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMessage.ADMIN));
        return;
    }
    user.signin(id, pw)
    .then(({code, json}) => {
        res.status(code).send(json);
        // res.redirect('public/login_after.html')
    })
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;

const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const crypto = require('crypto-promise');
const jwtUtils = require('../module/jwt');
const redis = require('redis');
const client = redis.createClient();
const moment = require('moment');
const nodemailer = require('nodemailer');

module.exports = {
    //회원가입->이메일 보내주기(회원가입 성공 시)
    signup:(id, pwd, name, nick, email, code) => {
        return new Promise(async(resolve, reject) => {
            //id, email이 중복인지 아닌지 확인하기
            const checkQuery = 'SELECT * from user WHERE id = ? OR email = ?';
            const checkResult = await db.queryParam_Parse(checkQuery, [id, email]);
            if(checkResult.length != 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.DB_ERROR, resMessage.SIGNUP_FAIL)
                });
                return;
            }
            const regist_dt = moment().format('YYYY-MM-DD');
            const insertUserQuery = 'INSERT INTO user (id, pwd, salt, name, nick, code, email, status, regist_dt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const buf = await crypto.randomBytes(64);
            const salt = buf.toString('base64');
            const hashedPw = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');
            const insertUserResult = await db.queryParam_Parse(insertUserQuery, [id, hashedPw.toString('base64'), salt, name, nick, code, email, '0', regist_dt]);
            if(insertUserResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.DB_ERROR, resMessage.USER_INSERT_FAIL)
                });
                return;
            }

            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user : 'sju03404@gmail.com',
                    pass : 'ShinJungAh1'
                }
            });
            
            var mailOption = {
                from : 'sju03404@gmail.com',
                to : email,
                subject : '인증 코드 메일입니다!',
                text : code
            };

            transporter.sendMail(mailOption, function(err, info) {
                if ( err ) {
                    console.error('Send Mail error : ', err);
                }
                else {
                    console.log('Message sent : ', info);
                }
            });

            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.CREATED_USER)
            })
            return;
        });
    },

    //로그인
    signin:(id, pw) => {
        return new Promise(async(resolve, reject) => {
            const selectUserQuery = 'SELECT verified, userIdx, pw, salt FROM user WHERE id = ?';
            const selectUserResult = await db.queryParam_Parse(selectUserQuery, [id]);
            if(selectUserResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.DB_ERROR, resMessage.USER_SELECT_FAIL)
                });
                return;
            }
            //가져온 salt를 decode한 pw 값이 입력한 pw와 같다면 로그인 성공 후 토큰 발급해주기!
            const salt = selectUserResult[0].salt;
            const userIdx = selectUserResult[0].userIdx;
            const hashedPw = await crypto.pbkdf2(pw, salt,1000, 32, 'SHA512');
            if(hashedPw.toString('base64') == selectUserResult[0].pw){
                //인증되지 않은 회원
                if(selectUserResult[0].verified == 0){
                    resolve({
                        code : statusCode.OK,
                        json : util.successFalse(statusCode.DB_ERROR, resMessage.NOT_VERIFIED)
                    });
                    return;
                }else if(selectUserResult[0].verified == 1){//인증된 회원
                    //로그인 성공->토큰 발급 후 
                    const token = jwtUtils.sign(selectUserResult[0]);
                    client.hmset(userIdx, 'token', token['token']);
                    var result;
                    client.hgetall(userIdx, (err, obj) => {
                        result  = obj['token'];//{token: "blabla"}의 형태
                    });  
                    resolve({
                        code : statusCode.OK,
                        json : util.successTrue(statusCode.OK, resMessage.LOGIN_SUCCESS, result)
                    })
                    return;                  
                }
            }
            resolve({
                code : statusCode.OK,
                json : util.successFalse(statusCode.DB_ERROR, resMessage.LOGIN_FAIL)
            });
            return;
        });
    },
};
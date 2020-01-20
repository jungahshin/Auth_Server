var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('../public/login.html');
})
router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));
router.use('/mail', require('./mail'));
router.use('/admin', require('./admin'));

module.exports = router;

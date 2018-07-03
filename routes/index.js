var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(`Time: ${new Date()}`);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', req: req});
});

/* POST home page */ 
router.post('/', function(req, res, next) {
  console.log(req.xhr);
  // res.json({name: 'syc', value: '1231231'});
  // res.status(500);
  res.send('post request');
});

/**
 * 字符串
 */
router.get('/about', function(req, res, next){
  console.log(123);
  next();
},function(req, res){
  res.send('你好,我是申玉超');
});

/**
 * 字符串模式
 */
router.get('/ab?cd', function(req, res){
  res.send('匹配acd,abcd');
});

/**
 * 回调函数数组
 */
function func1(req, res, next) {
  console.log('func1');
  next();
}
function func2(req, res, next) {
  console.log('func2');
  next();
}
function func3(req, res, next) {
  console.log('func3');
  res.send('经历3个函数完成请求');
}
router.get('/arr', [func1, func2, func3]);
module.exports = router;

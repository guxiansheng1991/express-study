let express = require('express');
let router = express.Router();
let userModel = require('../models/userModel/user');

/* GET users listing. */
router.get('/list', function(req, res) {
  userModel.find(function(err, data) {
    if(err) {
      res.render('error', {
        message: err
      });
    }else {
      res.render('userList', {users: data});
    }
  });
});
router.post('/add', function(req, res) {
  let newUser = new userModel({
    name: req.body.username
  });
  newUser.save(function(err, data) {
    if(err) {
      res.render({
        message: err
      });
    }
    res.redirect('/users/list');
  });
});
router.post('/delete/:name', function(req, res) {
  let name = req.params.name;
  userModel.remove({name: name}, function(err, data) {
    if(err) {
      res.render({
        message: err
      });
    }
    userModel.find(function(err, data) {
      if(err) {
        res.render('error', {
          message: err
        });
      }else {
        res.render('userList', {users: data});
      }
    });
  });
});
router.get('/edit/:name', function(req, res) {
  let name = req.params.name;
  if(name) {
    userModel.find({name: name}, function(err, data) {
      if(err) {
        res.render({
          message: err
        });
      }
      res.render('userUpdate', {user: data[0]});
    });
  }
});
router.post('/update', function(req, res) {
  let id = req.body.userid;
  userModel.findById(id, function(err, data) {
    if(err) {
      res.render({
        message: err
      });
    }
    data.name = req.body.name;
    data.save(function(err) {
      res.redirect('/users/list');
    });
  });
});
router.get('/detail/:name', function(req, res) {
  let name = req.params.name;
  userModel.find({name: name}, function(err, data) {
    if(err) {
      res.render({
        message: err
      });
    }
    res.render('userDetail', {user: data[0]});
  });
});

module.exports = router;

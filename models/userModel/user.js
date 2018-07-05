let mongoose = require('../conn');
let userSchema = new mongoose.Schema({
  name: String
});

// 创建数据库的时候,一定要在文档名字后加s
let userModel = mongoose.model('users', userSchema);

module.exports = userModel;
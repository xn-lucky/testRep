/* 
  创建一个约束，使用Schema

*/
const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({
  user:String,
  pass:Number
});

//最后将schema对象暴露出去
module.exports = userInfoSchema;
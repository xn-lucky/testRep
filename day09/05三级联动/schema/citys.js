/* 
  创建一个约束
*/
const {Schema,model} = require('mongoose');
//实例化一个约束
const citysSchema = Schema({
  code:String,
  province:String,
  city:String,
  county:String,
  name:String,
  leval:Number
})

//暴露出去的是一个集合
module.exports = model('cities',citysSchema);
/* 
  创建一个约束，在创建集合时需要此约束的地方引入
  约束是要将schema对象暴露出去的，model对象创建的时候需要
*/
const mongoose = require('mongoose');
//创建一个约束(teacher集合中的数据按照创建的这个约束进行增加数据)
//需要实例化mongoose.schema,传入约束对象进行约束
//并不是直接对某个集合做约束，而是写好一个约束以后给需要这个约束的集合使用
//返回一个schema对象
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,//唯一
        required: true,//必填
    },
    age:Number,
    sex:{
        type:String,
        default:'男'
    },
    //类型是数组，数组中的值是String类型的
    hobby:[String],
        //创建时间字段必须是 时间对象
    createTime: {
        type: Date,
        default: Date.now
    },
})

//暴露对象
module.exports = teacherSchema;
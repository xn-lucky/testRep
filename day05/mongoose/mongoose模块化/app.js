/* 
   入口文件
*/

//连接数据库
require('./db/db');
//引入约束
const teacherSchema = require('./schema/teacher');
//引入模块
const mongoose = require('mongoose');

//创建一个model对象
const Teacher =mongoose.model('teacher',teacherSchema);

Teacher.create({
    name:'模块化',
    age:1,
    hobby:['初始化','引入文件']
}).then((value)=>{
    console.log(value);
}).catch((err)=>{
    console.log(err);
})
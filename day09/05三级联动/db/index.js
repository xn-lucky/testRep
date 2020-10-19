/* 
  数据库连接
*/
const mongoose = require('mongoose');

module.exports = new Promise((resolve,reject)=>{
    mongoose.connect('mongodb://127.0.0.1:27017/ajax',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    //连接数据库触发的事件open
    mongoose.connection.once('open',(err)=>{
        if(err){
            console.log('数据库连接失败---'+err);
            reject();
        }else{
            console.log('数据库连接成功~~~');
            resolve();
        }
    })
})

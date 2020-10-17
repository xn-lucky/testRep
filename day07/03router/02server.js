const express = require('express');

const app = express();

//引入路由文件
const router = require('./01router');
// 执行这个中间件
app.use(router)

app.listen(3005,(err)=>{
    if(err){
       return console.log('err----'+err);
    }
    return console.log('服务启动成功 http://127.0.0.1:3005/user');
})
//引入模块
const express = require('express');
const {resolve} = require('path');


//引入正则路由模块
const userReg = require('../router/01user-Reg'); 
//引入登录注册路由
const userInfoRouter = require('../router/02userinfo-router');



//创建一个服务
const app = express();

//处理直接输入register.html和login.html就会直接跳入到指定页面
//这个可以通过中间件访问静态资源处理，只要访问对应文件夹，就可以找到对应文件进行跳转
//官方静态资源服务器 中间件 可以直接访问当前文件夹中的所有静态资源
//ex: http://localhost:3001/db/index.js
/* app.get('/register.html',(req,res)=>{
    res.sendFile(resolve(__dirname,'../public/register.html'));
})
app.get('/login.html',(req,res)=>{
    res.sendFile(resolve(__dirname,'../public/login.html'));
}) */

//req.body依赖的中间件
app.use(express.urlencoded({
    extended:true
}));

// express.static方法中的参数，路径指的是你启动服务时的文件夹的相对路径（node进程启动位置的相对路径），而不是当前运行文件所在的文件夹的相对路径（要么写绝对路径，要么在项目的文件夹中启动服务）
// app.use(express.static("../public"));
app.use(express.static(resolve(__dirname,'../public')));
//__dirname是当前运行文件的文件夹的绝对路径


//正则校验用户名和密码，提交请求后第一个执行的
app.use(userReg);

//接收请求和处理响应----称为路由

// 登录注册路由
app.use(userInfoRouter);

//若请求出现错误，会执行此中间件
// app.use((err,req,res,next)=>{
//     console.log(err+'1234567890');
// })
//启动这个服务
app.listen(3002, (err) => {
    if (err) {
        console.log('启动服务错误----' + err);
        return;
    }
    console.log('启动服务成功 http://127.0.0.1:3002');
})
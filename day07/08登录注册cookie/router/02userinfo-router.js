//引入模块
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
require('../db/db');
const {resolve} = require('path');

const cookieParser = require('cookie-parser');

router.use(cookieParser());
//引入创建好的约束
const userInfoSchema = require('../schema/user');
//创建一个我们引进的满足约束的集合,返回的是model对象
const UserInfo = mongoose.model('userInfo', userInfoSchema);

//接收请求和处理响应----称为路由

router.post('/register', async (req, res) => {
    //处理注册信息 获取传入的查询字符串
    /* 
       步骤：
          - 获取注册信息
          - 判断注册信息是否存在
          - 若不存在，需要保存数据库
          - 返回响应信息
    */
    //1 获取注册信息
    const {
        user,
        pass
    } = req.body; //post获取数据是在报文体中，req.body需要依赖一个中间件才可以使用
    console.log(user, pass);
    console.log(req.body);

    //2 判断注册信息是否存在（判断用户是否可以在库中查到）,利用find查询功能,查询后才能知道是否存在,增删改查有个回调函数来处理查询后的信息（异步的），如果嵌套写会产生回调地狱，正好增删改查操作的返回值是promise对象，所以利用promise和async/await来处理这个问题，用因为await不能存在于没有async的函数中，所以get方法的最后一个参数要使用async定义
    //find方法返回值的是一个数组,若没有数据返回一个空数组[]
    //findOne方法返回的是一个对象，若没有数据则返回一个空对象null
    const findUser = await UserInfo.findOne({
        user
    })
    if (findUser) {
        res.send('用户已经被注册！');
        return;
    }

    //3 若没有查询到注册信息，则将注册信息保存到数据库
    const saveUser = await UserInfo.create({
        user,
        pass
    })
    console.log(saveUser);

    if (saveUser) {
        //注册成功跳转登录页面
        res.sendFile(resolve(__dirname,'../public/login.html'));
        // res.send('注册信息保存成功！');
    }

})

router.post('/login', async (req, res) => {
    //登录是要判断用户是否存在且密码是否正确
    //解构字符串，获取需要的值
    const {
        user,
        pass
    } = req.body;

    //判断用户名和密码是否在数据库中
    //  （两种方法 1是先判断是否存在此用户，存在的话在判断密码是否正确，2是直接判断用户和密码是否正确）
    //方法1：
      const findUser = await UserInfo.findOne({
        user
    });
    console.log(findUser);
    console.log(findUser.pass);
    console.log(pass);
    if (findUser) {
        if (findUser.pass === Number(pass)) {
            /* res.send('用户登录成功！');
               登录成功后设置cookie
            */
           res.cookie('setUserID',findUser._id,{
               maxAge:1000*60*60*24*7,
               httpOnly:true
           })
            res.sendFile(resolve(__dirname,'../main/main.html'));
        } else {
            res.send('用户密码错误！');
        }
    } else {
        res.send('用户名错误！');
    }

    //方法2：
  /*   const findUser = await UserInfo.findOne({
        $and: [{
            user
        }, {
            pass
        }]
    });

    if (findUser) {
        res.send('用户登录成功！');

    } else {
        res.send('用户名或密码错误！');
    } */

})


module.exports =router; 

/* 
    登录：登陆页面login.html和主页面main.html
     - 直接去主页面会被拒绝，判断是否有cookie,有的话成功进入主页面
     - 首次登录，成功后，res会返回cookie,客户端将cookie保存到浏览器，再次请求时随着请求体一起发送给服务器，服务器会判断寻找是否有cookie,没有
*/

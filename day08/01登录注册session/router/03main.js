//引入模块
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
require('../db/db');
const {
    resolve
} = require('path');

const cookieParser = require('cookie-parser');

router.use(cookieParser());
//引入创建好的约束
const userInfoSchema = require('../schema/user');
//创建一个我们引进的满足约束的集合,返回的是model对象
const UserInfo = mongoose.model('userInfo', userInfoSchema);



router.get('/main.html', async (req, res) => {
    //直接访问的话，要判断是否有cookie
    /* 获取cookie的话要依赖第三方库cookie-parser */
    /*  const {setUserID} =  req.cookies;
     console.log('setUserID--------'+setUserID);
     //查找数据库中是否存在此用户
      const userData = await UserInfo.findOne({_id:setUserID}) ;
     console.log('userData-------'+userData);
     if(userData){
         res.sendFile(resolve(__dirname,'../main/main.html'));
         return;
     }else{
         res.send(`<a href="http://127.0.0.1:3002/login.html">请登录后在访问~~~</a>`);
         return;
     } */

    console.log(req.session);
    if (req.session) {
        const userData = await UserInfo.findOne({
            _id: req.session.userID
        })
        console.log('userData-------' + userData);
        if (userData) {
            res.sendFile(resolve(__dirname, '../main/main.html'));
            return;
        }
    }

    res.send(`<a href="http://127.0.0.1:3002/login.html">请登录后在访问~~~</a>`);
    return;

})

module.exports = router;
//引入模块
const express = require('express');

// 路由管理 通过new exress.Router创建
const router = new express.Router();

//中间件都在router上面定义

//正则校验用户名和密码，提交请求后第一个执行的
router.use((req, res, next) => {
    // console.log('首次执行');
    //获取用户名和密码
    const {
        user,
        pass
    } = req.body;
    //密码的校验一般是在注册的时候所以这边要判断一下请求是注册还是登录
    //根据请求的地址判断
    console.log('请求地址' + req.url)
    const isRegisterFlag = req.url === '/register' ? true : false;

    //用户名的正则：大写字母开头,长度6~10位
    const userReg = /^[A-Z]\w{5,9}$/g;
    // console.log(userReg.test(user));
    if (!userReg.test(user)) {
        const errData = {
            errMes: '用户名格式不对,应是大写字母开头的6~10位',
            errPassMes: '',
        }
        //返回ejs,若是注册，则返回注册页面，否则返回登录页面，要把提示信息传过去
        isRegisterFlag ? res.render('register.ejs', errData) : res.render('login.ejs', errData);
         return;
        // return res.render('')
        // return res.send('用户名格式不对,应是大写字母开头的6~10位');
    }
    //密码的正则：6~10位的数字
    const passReg = /\d{6,10}/g;
    if (isRegisterFlag && !passReg.test(pass)) {
        const errData = {
            errMes: '',
            errPassMes: '密码格式不对,应是6~10位数字',
        }
        res.render('register.ejs', errData);
        return;
    }
    //执行这个函数后才会继续向下执行
    next();
})

// 将router暴露出去
module.exports = router;
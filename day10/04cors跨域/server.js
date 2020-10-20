const express = require("express");
//注册一个服务
const app = express();


app.get("/user", (req, res) => {
    console.log(req.query);
    const data = {
        mes: '数据收到'
    }
    //cros跨域
    //方法一：所有的请求都允许跨域
    // res.set('Access-Control-Allow-Origin','*');

    //方法二:做一个限制（设置白名单，请求的地址若在白名单中，就设置允许跨域）
    const safeUrl = ['http://127.0.0.1:5500', 'http://baidu.com'];
    //获取请求过来的地址
    const originUrl = req.headers.origin;
    if (safeUrl.includes(originUrl)) {
        res.set('Access-Control-Allow-Origin', originUrl);
        /* 
           还有设置一些跨域的响应头信息（了解一下）
           
             Access-Control-Allow-Credentials: true
            当请求是非get的时候，或者请求头有特殊字段的时候,浏览器会发送一个预检请求（请求方式是options）
            预检请求检查当前是否允许跨域，如果不行 则直接拒绝不在发送
            Access-Control-Allow-Headers：x-class0721-hello
            允许以上设置的请求头字段可以跨域
            Access-Control-Allow-Methods: GET, OPTIONS, HEAD, PUT, POST、
            允许跨域请求的方法
            Access-Control-Allow-Origin: https://juejin.im
            允许跨域请求的地址
            Access-Control-Max-Age: 1800
            预检请求的缓存时间
        
        
        */
    }
    res.send(JSON.stringify(data));

})

//启动服务
app.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3000");
})
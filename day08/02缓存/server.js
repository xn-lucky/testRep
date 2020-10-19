//引入模块
const express = require('express');
const {resolve} = require('path');

const fs = require('fs');
//可以改造异步方法，返回promise对象
const {promisify} =  require('util');
//创建一个服务
const app = express();

app.get('/index.html',(req,res)=>{
    /* 
      sendFile会自动设置缓存，我们测试缓存时直接使用可写流返回响应，然后在设置缓存
    */
    // res.sendFile(resolve(__dirname,'./public/index.html'));
    //这是是没有设置缓存的，我们需要手动设置，给响应头
    const re = fs.createReadStream(resolve(__dirname,'./public/index.html'));
    res.set("Content-Type", "text/html;charset=utf-8");
    // res.set('cache-control','max-age=60');
    re.pipe(res);

})
app.get('/js/index.js',(req,res)=>{
    // res.sendFile(resolve(__dirname,'./public/js/index.js'));
      //这是是没有设置缓存的，我们需要手动设置，给响应头
      const re = fs.createReadStream(resolve(__dirname,'./public/js/index.js'));
      res.set("Content-Type", "application/javascript;charset=utf-8");
    //设置强制缓存 http1.1，用于设置在 Cookie 失效之前需要经过的秒数
    res.set("cache-control", "max-age=10");
    //设置强制缓存 http1.0，expires设置的时间是，时间的有效期到哪里，若是系统时间改变，则这个时间也会改变
    res.set("expires", new Date(Date.now() + 1000 * 3600).toGMTString())

      re.pipe(res);
})
app.get('/css/index.css',(req,res)=>{
    //文件路径
    const filtPath = resolve(__dirname,'./public/css/index.css')

    //协商缓存：请求时请求头中包含文件的唯一标识和最后一次修改时间，文件的基本信息中含有文件的唯一标识，所以要获取文件的基本信息，找到唯一标识。fs.stat可以读取，要获取后才能处理下面的逻辑，嵌套的话容易产生回调地狱，所以使用promise/async\await方法，

    //把stat方法转换成返回promise对象的方法
    const stat  = promisify(fs.stat);
    //等待stat方法，去读取文件的详细信息，并返回出来
    const fileInfo = await stat(filtPath);

    //获取文件的最后一次修改时间，并转换为时间对象字符串
    const ifNoneMatch


    

    res.sendFile(resolve(__dirname,'./public/css/index.css'));
})

//启动这个服务
app.listen(3002, (err) => {
    if (err) {
        console.log('启动服务错误----' + err);
        return;
    }
    console.log('启动服务成功 http://127.0.0.1:3002');
})
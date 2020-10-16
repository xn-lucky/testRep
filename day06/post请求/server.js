const express = require('express');
const {resolve} = require('path');
const app = express();

app.post('/post',(req,res)=>{
    //post请求的数据在报文体中，报文体的获取方式是body
    // console.log(req)
    console.log(req.body)
    console.log(req.query)
    res.send('请求啦~')
})
app.get('/form.html',(req,res)=>{
    res.sendFile(resolve(__dirname,'./post.html'));
})

app.listen(3001,(err)=>{
    if(err){
        console.log('err---'+err);
        return;
    }
    console.log('服务启动');
})
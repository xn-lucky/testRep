const express = require('express');
const {resolve} = require('path');
const app = express();

// 可以将req对象处理，比如可以直接通过req.body获取请求体
app.use(express.urlencoded({
    extended: true
}))

app.post('/post',(req,res)=>{
    //post请求的数据在报文体中，报文体的获取方式是body
    //但是req.body不能直接使用，会返回undefined，要依赖一个中间件
    // console.log(req)
    console.log(req.body)
    // 获取传过来的用户名
    const {user} = req.body;
    // console.log(req.query)
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
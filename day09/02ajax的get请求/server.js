const express = require('express');

const app = express();
app.use(express.static('./public'));
app.get('/userinfo',(req,res)=>{
    //获取请求体
    console.log('请求体',req.query);
    res.json({name:'huahua',age:18});
})


app.listen(3000,(err)=>{
    if(err){
        return console.log('服务启动失败--'+err);
    }
    console.log('服务启动成功-- http://127.0.0.1:3000');
})
const express = require('express');

const app = express();
app.use(express.static('./public'));
//将post的请求体获取后挂载到req上,只能处理urlencoded编码格式的请求
app.use(express.urlencoded({
    extended:true
}))

//获取post请求体，并挂载到req上，只能处理json字符串格式的请求
app.use(express.json());

app.post('/userinfo',(req,res)=>{
    //获取请求体
    console.log('请求体',req.body);
    res.json({name:'huahua',age:18});
})


app.listen(3000,(err)=>{
    if(err){
        return console.log('服务启动失败--'+err);
    }
    console.log('服务启动成功-- http://127.0.0.1:3000');
})
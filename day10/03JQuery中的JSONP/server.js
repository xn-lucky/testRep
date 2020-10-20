const express = require("express");
//注册一个服务
const app = express();


app.get("/user", (req, res) => {
    console.log(req.query);
    //接收传过来的callback
    const {
        callback
    } = req.query;

    const data = {
        name: 'jsonp',
        info: '通过jQuery来实现跨域JSONP'
    }
    //拼接数据
    res.send(`${callback}(${JSON.stringify(data)})`);
    
    // res.send("alert(1)");
})

//启动服务
app.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3000");
})
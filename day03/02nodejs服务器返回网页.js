//nodeJS自身可以构建服务器，而且http模块是由C++实现的，性能可靠。

/* 
   http: 使用require('http')
   既能搭建服务器，也能搭建客户端
      - 服务器：接收请求，处理请求，返回响应
      - 客户端：发送请求，接收响应
*/
//引入http模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname,'./08PC最终版/index.html');
const rs = fs.createReadStream(filePath);

/* 
  若想返回一个网页，则需要将网页先读出来，最后在写入到response中响应
*/

//创建一个服务器
const server = http.createServer((res,req)=>{
    //res:request 请求对象，包含客户端发送服务器的数据
    //req:response 响应数据，服务器发送客户端的数据

    //返回信息的时候，要说明你返回的内容是属于什么类型的，需要什么编码去解析（类似一个你输出文本的说明书）
    req.setHeader('Content-Type','text/html;charset=utf-8');
    // req.end('<h1>出来没</h1>');
    rs.pipe(req);

})

//启动服务器
// 启动服务器需要参数：（1）端口号（2）ip地址
const port = 8080;
// const host = '127.0.0.1';
const host = '192.168.20.77';

server.listen(port,host,(err)=>{
    if(err){
        console.log("服务器启动失败了", err);
        return;  
    }
    //告知访问的地址
    const address = `http://${host}:${port}`;
    console.log(`服务器启动成功了~ 访问服务器地址：${address}`)
})

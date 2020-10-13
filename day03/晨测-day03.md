### 10.12晨测
### 谈一谈加密
    (1) crypto模块提供了加密功能,使用require('crypto')访问模块
    (2) 消息摘要加密算法 (md5 sha1 sha256 sha512)
        --特点
           * 生成的密文长度固定
           * 同样的明文加密后一定得到同样的密文
           * 不可逆 （不能通过密文逆向破解明文）
    (3) 使用
        
         const crypto = require('crypto');
         const secret = '123456';//明文

       //使用createHmac方法可以生成一个HMAC对象 参数是加密方式 和 明文
        const hash = crypto.createHmac('MD5', secret);
       //通过digest可以把HMAC对象转换成16进制显示或保存
        const mySecret = hash.digest("hex");
        
### 什么是http协议
   (1) 协议就是：在网络通信中，两台计算机必须准守的规则或者规定。
   (2) http协议就是：超文本传输协议。在万维网中，服务器向浏览器传递超文本的时候准守的协议。
   (3) 在客户端和服务端互传的信息称作为报文，http协议规定了报文的格式。服务端响应的报文称作为响应报文，客户端发送的报文称作为请求报文.

### nodejs搭建一个服务端，并返回一个html数据
   (1) 引入模块
      const http = require('http');
   (2) 创建一个服务
      const server = http.createServer((request,response)=>{
           //返回响应
          response.setHeader('Content-Type','text/html;charset=utf-8');
          response.end('<h1>我是服务器响应的</h1>');
      })
    (3) 启动服务
      const port = 8080;//端口号
      const host = "127.0.0.1";//ip地址
      server.listen(port,host,(err)=>{
          if (err) {
             console.log("服务器启动失败：" + err);
             return;
          }
          console.log(`服务器启动成功:请访问 http://${host}:${port}`)
      })
    
### 书写一个快速读写文件
  (1) 引入模块
   const fs = require("fs");
   const path = require("path"); 
  (2) 拼接路径
   const readFilePath =path.resolve(__dirname, "../111.mp4");
   const writeFilePath = path.resolve(__dirname, "./222.mp4");
  (3) 创建可读可写流
     const rs = fs.createReadStream(readFilePath);
     const ws = fs.createWriteStream(writeFilePath);
  (4) 通过pipe方法快速写入
     rs.pipe(ws);
   
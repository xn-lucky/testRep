/* 
   express: 是一个框架，里面封装了一些方法
     首先先下载npm i express
*/
//引入模块
const express = require('express');
const {resolve} = require('path');

//创建application对象，就相当于创建一个服务器
//直接调用引入的express函数
const app = express();

//只需要写端口号，IP地址有在内部封装（localhost/127.0.0.1等）
//启动服务
app.listen(3001,(err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动成功 http://localhost:3001")
})

/* 
   路由：定义访问的url和处理请求/返回响应的方法
*/
app.get('/',(req,res)=>{
    console.log('根目录的请求及响应');

    //请求处理
     //值得注意的是：req.query,作用是返回查询字符串的对象格式,不需要我们去split在拼接了
     console.log(req.query);

     /* 
        req.url是获取请求的地址，get请求的话可以获取后面的查询字符串
        req.method是获取请求方式

        以前的拼接方法也要会
       //获取用户get请求发送过来的数据
      const resulte = req.url.split("?")[1].split("&").reduce((p, c) => {
        const [key, value] = c.split("=");
        p[key] = value;
        return p;
    }, {})
    console.log(resulte); 

      //querystring库也可以处理查询字符串对象，这个要将？之后的传过去，所以要获取？之后的字符串
        //导入库
          const qs = require('querystring');
          qs.parse(req.url.split('?')[1])
     */


    //返回响应
    //send方法中自动设置了响应头（content-type）
    // res.send('根目录的请求及响应');

    /*
     end方法并没有自动设置响应头（content-type）,所以需要我们自己设置
    res.end('根目录的请求及响应') */

    //将内容转为json返回，不是json格式的，就转为字符串
    /* res.json({
        name:'huahua'
    }); */
    // res.json('json')
    //
  /*   res.download("./index.html") //返回响应，浏览器自动下载,相对路径也可以 */
    // res.sendFile("./index.html")
/*     console.log(__dirname) 
    res.sendFile(resolve(__dirname,'./package.json')) */
    //返回相应，浏览器自动打开文件，是在本网页打开文件，不是另开一个窗口 (这里要填写绝对路径，相对路径会报错)
    //返回重定向
    /* res.redirect('http://www.baidu.com'); */

    /* 
      一般不设置
        -- 响应头设置时，不能在返回响应之后会报错（虽然页面会返回信息）Cannot set headers after they are sent to the 
        -- 状态码也是要在响应信息之前设置才会起作用
    */
     //设置响应头
   /*   res.set("hello","world");
     res.status(232)//设置相应状态码
     res.send('根目录的请求及响应'); */
   
    


})
app.get('/user',(req,res)=>{
    console.log('根目录下的user目录下的请求和响应');
})
// '/:id':接收当前规定路径的任意请求，id只是一个标识，可以改为其他的名称
app.get('/:id',(req,res)=>{
console.log('req.params---'+req.params);

})


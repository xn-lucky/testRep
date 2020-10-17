const express = require('express');
//获取cookie的第三方库引入
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/login',(req,res)=>{
    //设置cookie
    // 响应时候会返回cookie,客户端保存，再次请求后携带
    // res.cookie("userID", "123456")//这种设置是没有设置时间，当浏览器关闭后会消失
    /* 
       当请求login时，就设置一个cookie给客户端
       cookie在客户端按照域名和浏览器保存的
       只要在这个域名下，所有的页面都可以访问到cookie
       换一个浏览器就不能访问其他浏览器的cookie
       不同域名不可以互相访问cookie
    */
    res.cookie('setID','987654321',{
        maxAge: 1000 * 3600 * 24 * 7,//设置保存时间位7天
        httpOnly:true//设置后，使用document.cookie获取不到cookie
    })
    res.send('设置cookie了，快看设置成功没~')

})

app.get('/success',(req,res)=>{
    //在/login中设置成功后，在这边看是否是你需要的 那个cookie,若成功匹配直接打印成功，否则拒绝
    //1、首先获取cookie,两种方法
    // 方法-：使用req.cookies获取(前提是要使用第三方库cookie-parser,并引入)，获取的是对象（推荐使用方法）
    //方法二：使用自身的req.headers.cookies获取，但是获取的是字符串

    //将获取到的值进行解构
    const {setID,userID} = req.cookies;
    console.log(setID);
    if(setID === '987654321'){
        return  res.send('欢迎登陆成功');
    }else{
        return  res.send('拒绝访问');
    }
})

//删除cookie可以直接将之前设置过的cookie的时间改为已过期的时间或者0
app.get('/quit',(req,res)=>{
    res.cookie('setID','',{
        maxAge: 0,
        httpOnly:true//设置后，使用document.cookie获取不到cookie
    })
    res.send('已退出/删除cookie')
})

app.listen(3009,(err)=>{
     if(err){
         return res.send('启动失败'+err);
     }
     console.log('启动成功 http://127.0.0.1:3009');
})
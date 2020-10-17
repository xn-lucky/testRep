/* 
  ejs(模板引擎):
     1、服务器渲染技术（就是说服务端 对页面进行一些数据请求，将页面在整体返回给前端（这里就省了一个步骤，请求到页面后，前端再去请求页面的数据信息））
     2、使用
       - 需要下载npm i ejs
       - 配置ejs
         //配置使用哪一个模板引擎
         //配置模板引擎资源目录
   
*/

//引入ejs
// const ejs = require('ejs');
const express = require('express');

const app = express();
// 配置使用哪一个模板引擎
// app.set("view engine", "ejs");
// 配置模板引擎资源目录(设置模板储存的位置)
//第一个参数就是默认的，第二个参数是你设置的文件加的名字，不设置这行代码的话，默认是去当前文件夹下找views文件夹下的文件
// app.set("views", "views")

app.get('/single',(req,res)=>{
    //创建一个数据（一般数据从数据库获取）
    const data = {
        name:'huahua',
        age:12
    }
    //res.render 把数据和模板合在一起渲染，后并一起返回响应
    res.render('index.ejs',data)

})

app.get('/more',(req,res)=>{
    //创建多条数据（一般数据从数据库获取）
    //一般情况下多条数据保存的格式是数组，数组中含有多个对象，但是我们通过ejs获取的话并不能获取到
    //所以多条数据也是使用对象保存，然后里面的对象保存的是数组，这样ejs页面就可以获取到你的多条数据，最后在遍历
    const data = {
        dataCol:[
            {name:'lili',age:32},
            {name:'hh',age:12}
        ]
    }
    //res.render 把数据和模板合在一起渲染，后并一起返回响应
    res.render('more.ejs',data)

})


app.listen(3006,(err)=>{
    if(err){
        return console.log('失败'+err);
    }
    console.log('成功 http://127.0.0.1:3006');
})


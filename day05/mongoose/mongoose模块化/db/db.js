/* 
   连接数据库模块，不需要暴露，直接在使用的页面引入即可
*/

//引入模块
const mongoose = require('mongoose');

//连接数据库，使用mongoose中的connect方法，
//第一个参数是mongodb:// + 主机/服务器地址/localhost + :端口号 + /要连接的数据库
mongoose.connect('mongodb://127.0.0.1:27017/guigu',{
    //用于解决连接数据库时出现的警告问题
    useNewUrlParser:true,
    useUnifiedTopology: true
});


//数据库连接成功后会立即触发open的事件
//在mongoose对象的connection对象上绑定事件
mongoose.connection.on('open',(err)=>{
    if(err){
        console.log('连接失败-----'+err)
        return;
    }
    console.log('MongoDB数据库连接成功')
})
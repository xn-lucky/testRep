/*
  连接数据库使用mongoose
*/
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/guigu',{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
});

//连接成功后会自动触发open事件
// mongoose对象的connetion对象上绑定open事件
mongoose.connection.on('open',(err)=>{
    if(err){
        console.log('err---'+err);
        return ;
    }
    console.log('MongoDB连接成功');
})
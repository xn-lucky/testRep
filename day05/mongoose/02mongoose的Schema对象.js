//引入模块
const mongoose = require('mongoose');

//使用mongoose的connect方法连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/guigu',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//数据库连接后会触发open事件
//在mongoose对象的connection对象上绑定事件
mongoose.connection.on('open',(err)=>{
    if(err){
        console.log('连接失败----'+err);
        return ;
    }
    console.log('MongoDB数据库连接成功');
})

//创建一个约束(teacher集合中的数据按照创建的这个约束进行增加数据)
//需要实例化mongoose.schema,传入约束对象进行约束
//并不是直接对某个集合做约束，而是写好一个约束以后给需要这个约束的集合使用
//返回一个schema对象
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,//唯一
        required: true,//必填
    },
    age:Number,
    sex:{
        type:String,
        default:'男'
    },
    //类型是数组，数组中的值是String类型的
    hobby:[String],
        //创建时间字段必须是 时间对象
    createTime: {
        type: Date,
        default: Date.now
    },
})

//创建一个集合，符合上面的约束的
//model对象就相当于集合，对集合操作
//创建model对象，并传入约束
const Teacher = mongoose.model('teacher',teacherSchema);

//创建document对象，即文档对象
//实例化model对象
//初始化数据，也可以不初始化
//初始化后需要将数据保存一下，相当于关系型数据库的commit
new Teacher({
   name:'liwang',
   age:12,
   hobby:['打架'] 
}).save((err)=>{
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功');
})



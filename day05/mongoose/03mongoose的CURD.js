//引入模块
const mongoose = require('mongoose');

//使用mongoose的connect方法连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/guigu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//数据库连接后会触发open事件
//在mongoose对象的connection对象上绑定事件
mongoose.connection.on('open', (err) => {
    if (err) {
        console.log('连接失败----' + err);
        return;
    }
    console.log('MongoDB数据库连接成功');
})

//创建一个约束(teacher集合中的数据按照创建的这个约束进行增加数据)
//需要实例化mongoose.schema,传入约束对象进行约束
//并不是直接对某个集合做约束，而是写好一个约束以后给需要这个约束的集合使用
//返回一个schema对象
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, //唯一
        required: true, //必填
    },
    age: Number,
    sex: {
        type: String,
        default: '男'
    },
    //类型是数组，数组中的值是String类型的
    hobby: [String],
    //创建时间字段必须是 时间对象
    createTime: {
        type: Date,
        default: Date.now
    },
})

//创建一个集合，符合上面的约束的
//model对象就相当于集合，对集合操作
//创建model对象，并传入约束
const Teacher = mongoose.model('teacher', teacherSchema);

/* 
    create ----- 创建(增)
     - create方法第一个参数是一个对象（添加一条数据的时候）或一个数组（当添加多条数据的时候），第二个参数是回调函数
     - 返回值 是一个promise对象，所以可以直接使用then/catch方法
*/
/* Teacher.create({
    name:'liwang',
    age:12,
    hobby:['打架']
},(err)=>{
    if(err){
        console.log('创建失败----'+err);
        return ;
    }
    console.log('添加数据成功');
}) */
/* const data = Teacher.create([{
    name: 'haha',
    age: 6,
    hobby: ['打羽毛球']
},{
    name:'xixi',
    age:8,
    hobby:['打牌'] 
}])

data.then((value)=>{
    //返回的值就是你添加的数据
    console.log(value);
}).catch((err)=>{
    console.log(err);
}) */

/* 
    find ---- 查
      - 返回值 也是一个promise对象
      - 使用方法 跟MongoDB数据库查询的命令行一致
*/
// const data = Teacher.find();
/* const data = Teacher.find({age:{$lt:10}});
data.then((value)=>{
    //返回的值就是你查询出来的数据
    console.log(value);
}).catch((err)=>{
    console.log(err);
}) */

/* 
   update ------- 改
     - 返回值 也是一个promise对象
     - 使用方法 跟MongoDB数据库修改的命令行一致
*/
/* const data = Teacher.updateMany({$inc:{age:1}});
data.then((value)=>{
    //返回的值就是你查询出来的数据
    console.log(value);
}).catch((err)=>{
    console.log(err);
})  */

/* 
   delete ---- 删除
      - 返回值 也是一个promise对象
     - 使用方法 跟MongoDB数据库删除的命令行一致
*/
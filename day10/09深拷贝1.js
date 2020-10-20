const obj = {
    name: "xiaowang",
    age: 18,
    hobby: {
        one: "喝酒",
        two: "写代码"
    },
    score: [100, 90, 80],
    do() {
        console.log("eat")
    }
}

//浅拷贝
/* const obj1 = Object.assign({},obj);
obj1.age=16;//第一层不会修改
obj1.hobby.one = '打麻将';//第一层之后会被修改
console.log(obj); */

//深拷贝:运用到了递归

//创建一个函数，用于判断传进来的值是什么类型的，能准确地判断是数组还是对象是通过Object.prototype.toString.call(obj)来获取的
function check(obj) {
    //打印出来的格式是'[object Object]',我们需要截取一下
    // console.log(Object.prototype.toString.call(obj))
    // 可以通过slice,下面的意思是从下标为8开始，到最后一个字段结束
    // console.log(Object.prototype.toString.call(obj).slice(8,-1))
    return Object.prototype.toString.call(obj).slice(8, -1);
    // return Object.prototype.toString.call(obj);

}

function deepClone(obj) {
    //精确的判断类型，用于生成对应类型的数据，函数没有深拷贝和浅拷贝之分（一般也不会去改）
    let res;
    if (check(obj) === 'Object') {
        res = {};
    } else if (check(obj) === 'Array') {
        res = [];
    } else {
        return obj;
    }
    //循环遍历obj
    for(let i in obj){
        //判断每次遍历的对象
        res[i] = deepClone(obj[i]);
    }
    return res;
}

const result = deepClone(obj);
result.age=43;
result.hobby.one = '打麻将';
console.log(obj);
console.log(result);

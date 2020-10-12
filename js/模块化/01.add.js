/* function add(...rest){
    return rest.reduce((p,c)=> p+c,0);
} */

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

//获取被写入文件的路径
const filePath = path.resolve(__dirname, "./01.txt");

const openFile = promisify(fs.open);
const writeFile = promisify(fs.write);
const closeFile = promisify(fs.close);


(async () => {
    //await的返回值是后边等待的promise对象成功值
    const fd = await openFile(filePath,'a');
    await writeFile(fd,'输出');
    await closeFile(fd);
})().then(() => {
    console.log("成功")
}).catch((err) => {
    console.log("err:" + err)
})
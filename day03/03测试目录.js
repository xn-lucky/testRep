
/* console.log(__dirname);
console.log(process.cwd()); */
/* let i=0;
setInterval(()=>{
    i++;
    if(i>5){
        process.exit();
    }
    console.log(`i----${i}`);
},2000) */

/* const timer = setInterval(()=>{
    i++;
    if(i>5){
        clearInterval(timer);
        return ;
    }
    console.log(`i----${i}`);
},2000) */


const path = require('path');
const fs = require('fs');
const filePath = path.resolve(__dirname,'index.html');

/* console.log(filePath);
console.log(process.cwd()); */


const {promisify} = require('util');
// console.log(promisify.toString());
const openFile = promisify(fs.open);
const writeFile = promisify(fs.write);
const closeFile = promisify(fs.close);
console.log(openFile);
console.log(openFile.toString());


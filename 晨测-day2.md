### 10.10晨测
- 分析node的外层函数

        ```
 *  在nodeJS中，每一个JS模块都包裹了一层函数。（判断代码外部是否有函数，可通过arguments打印出来，arguments.callee.toString()打印出的是外层函数的函数体）
 * 外层函数
     * 格式： function(exports,require,module,__filename,__dirname){}
     *  参数含义
       -  exports：指向的是暴露对象module.exports
       -  require: 引入
       -  module：module对象
       -  __dirname:文件夹绝对路径
       -  __filename：文件的绝对路径
        ```

- 谈一谈Buffer

   ```
    * 是一个类似数组的对象，不同的是Buffer是专门用来保存二进制数据的（数据储存为二进制，性能是最好的）
    * Buffer类在全局作用域中，Global上，可以直接使用，因此无需使用require('buffer').Buffer
    
    -- 特点：
      1、 大小固定：在创建时就确定了，且无法调整
      2、 性能较好：直接对计算机的内存进行操作
      3、 每个元素大小为1字节 
   ```

- 谈谈process

   ```
     * process 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。 作为一个全局变量，它始终可供 Node.js 应用程序使用，可以直接使用。
     * 属性和方法
       -- process.argv：返回一个数组，其中包含当启动Node.js进程时传入的命令行参数
       -- process.cwd()：返回Node.js进程的当前工作目录。绝对路径
       -- process.exit([code])：退出进程
   ```

- 谈谈path.resolve方法

  ```
  * path.resolve() 方法会将路径或路径片段的序列解析为绝对路径
  * 没有参数的时候，默认是当前文件夹所在绝对路径
  ```

  ​

- 谈一谈fs文件系统

        ```
*  全称为file system，对计算机中的文件进行增删改查等操作。它是一个服务器的基础，在Node中通过fs模块来操作文件系统。
*  需要引入require('fs');
*  fs中的大部分方法都为我们提供了两个版本（同步和异步）
        ```


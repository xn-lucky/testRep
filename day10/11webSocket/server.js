const express = require("express");

//注册一个服务
const app = express();
app.use(express.static("./public"))

//是express 引入websocket的固定格式
const server = require('http').Server(app);
const io = require('socket.io')(server);

//当用户连接上ws服务器的时候，就会自动触发一个connect事件
io.on('connect', (socket) => {
    //socket就是当前连接的用户
    //服务器定义了client_to_server事件，当用户发送消息时，会触发这个事件接收用户的消息内容
    socket.on('client_to_server', (data) => {
        //data就是当前用户发送的数据
        //接收完成后，要将数据分发给其他客户端
        //可以在客户端定义一个事件server_to_client，我们在服务器调用即可
        socket.broadcast.emit('server_to_client',data);
    })
})

//启动服务
server.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://192.168.123.18:3000");
})
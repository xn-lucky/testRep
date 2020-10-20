<!-- 
   跨域：
     - 同源策略
       (1) 同源策略(Same-ORigin Policy)，是浏览器的一种安全策略
       (2) 同源：协议、域名、端口号 必须相同，否则就违背了同源策略
       (3) 违背同源策略就是跨域

     - 解决跨域
       (1) JSONP
         - JSONP(JSON with Padding),是一个非官方的跨域解决方法，纯粹凭借程序员的聪明才智开发出来的，只支持get请求。
         - 如何工作的
          * 在网页中有一些标签天生具有跨域能力。比如：img、link、iframe、script.(JSONP就是利用script标签的跨域能力来发送请求的)

       (2) 使用
         - 动态创建一个script标签
          const script = document.createElement('script');
         - 设置script.src ,设置回调函数
          script.src = "http://localhost:3000/testAJAX?callback=fn";
         - 将script添加到body中
          document.body.appendChild(script); 
         - 创建一个函数
            window.fn = function(data){//data为服务端返回来的数据}
         - 服务端也有将数据拼接
           //接收传过来的callback
            const {
               callback
                 } = req.query;

            const data = {
               name: 'jsonp',
               info: '通过script来实现跨域的'
                }
            //拼接数据
            res.send(`${callback}(${JSON.stringify(data)})`);

 -->
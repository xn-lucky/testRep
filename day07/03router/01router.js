const express = require('express');

//创建一个路由
const router = new express.Router();

router.get('/user',(req,res)=>{
    res.send('<h1>当前user返回</h1>')
})
// 暴露出去
module.exports = router;
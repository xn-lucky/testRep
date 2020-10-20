const express = require('express');
//引入模块(自动打开页面)
const open = require('./open/index');
//引入数据库
const db = require('./db/index');
//引入集合约束
const Cities = require('./schema/citys');



//创建一个服务
const app = express();
app.use(express.static('./public'));

//判断连接数据库是否成功
db.then(() => {
    //成功后,内容都会写在这里面

    /* 
      分析:(其他的细节后面在抠(比如,选择后要清空其后面的所有信息))
        1:刚进入页面,需要加载省份信息,获取省份信息,然后返回到页面上显示
        2:选择省份信息后,再次请求该省份信息下的市,页面显示
        3:选择市信息后,在根据省和市,请求市下面的县/区的数据
    */

    //1.获取省份
    app.get('/province', async (req, res) => {
        //处理异常
        try {
            //获取所有的省份
            const proData = await Cities.find({
                level: 1
            }, {
                name: 1,
                province:1,
                _id: 0
            });
            // console.log(proData);
            //响应数据
            res.json({
                status: 0,
                proData
            })
        } catch (e) {
            res.json({
				status: 1,
				err: "网络出问题了哦,请重新刷新~~~"
			})
        }
    })

     //2.获取市
     app.get('/city', async (req, res) => {
        //处理异常
        try {
            //首先获取传过来的参数(省份)
            const {province} = req.query;
            // console.log('province--',province)
            // console.log(' req.query--', req.query)
            //获取所有的省份
            const cityData = await Cities.find({
                province,
                level: 2
            }, {
                name: 1,
                city:1,
                _id: 0
            });
            // console.log('cityData--',cityData);
            //响应数据
            res.json({
                status: 0,
                cityData
            })
        } catch (e) {
            res.json({
				status: 1,
				err: "网络出问题了哦,请重新刷新~~~"
			})
        }
    })

    
     //3.获取县/区
     app.get('/county', async (req, res) => {
        //处理异常
        try {
            //首先获取传过来的参数(省份\市)
            const {province,city} = req.query;
            console.log(req.query)
            //获取所有的省份
            const countyData = await Cities.find({
                province,
                city,
                level: 3
            }, {
                name: 1,
                _id: 0
            });
             console.log(countyData);
            //响应数据
            res.json({
                status: 0,
                countyData
            })
        } catch (e) {
            res.json({
				status: 1,
				err: "网络出问题了哦,请重新刷新~~~"
			})
        }
    })

}).catch((err) => {
    console.log('数据库出现问题')
})




app.listen(8000, (err) => {
    if (err) {
        return console.log('服务启动失败---' + err);
    }
    console.log('服务启动成功~~~');
    open('http://127.0.0.1:8000');
})
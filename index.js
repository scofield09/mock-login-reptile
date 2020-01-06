const fs = require('fs');
const express = require('express');
const app = express();
var login = require("./login");
app.set('view engine','ejs')
// app.set('views',__dirname+'/views')

var dict = {
    title:'啥也是',
    imgurl:''
}

login.getLoginCookie();

//因为异步执行 所以设置一个定时器 获取base64图片
setTimeout(function(){
    var getArr = require('./login');
    dict.imgurl = getArr.arr[1];
},2000)

app.get('/', (req,res)=>{
    console.log(dict)
    res.render('index',dict)
});

app.get('/get',(req,res)=>{
    console.log(0);
    res.end();
})

app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})
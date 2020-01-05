const fs = require('fs');
const express = require('express');

const app = express();
app.set('view engine','ejs')
// app.set('views',__dirname+'/views')

var dict = {
    title:'啥也是',
    imgurl:'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'
}

app.get('/', (req,res)=>{
    // fs.readFile("index.html",function(err,data){
    //     //设置响应头
    //     if(!err){
    //         res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    //         //加载的数据结束
    //         res.end(data)
    //     }else{
    //         res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
	// 		//加载的数据结束
	// 		res.end('<h1> 所需内容未找到404 </h1>')
    //     }   
    // })
    res.render('index',dict)
});

app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})
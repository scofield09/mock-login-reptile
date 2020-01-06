var superagent= require("superagent");
var cheerio=require("cheerio");
var  url={
    url:"http://222.171.146.55/j_spring_security_check",
    login_url:"http://222.171.146.55/login",
    target_url:"http://222.171.146.55/index.jsp",
    login_img_url:'http://222.171.146.55/img/captcha.jpg',
    mail_url:"http://222.171.146.55/student/rollManagement/electronicRegistration/index"
};
var arr = [];
// 浏览器请求报文头部部分信息
var browserMsg={
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
    'Content-Type':'application/x-www-form-urlencoded'
};


// 发送登陆请求，获取 cookie 信息
function getLoginCookie() {
    //  首先，需在 set 方法中设置请求报文中参数，以性器官免服务器端有针对非浏览器请求做相关处理
    //  send 方法中设置 post 请求中需提交的参数
    //  redirects 方法调用，其中参数为 0 ，为了避免在用户登陆成功后，引起的页面重新刷新，从而无法获取 cookie
    superagent.post(url.login_url).set(browserMsg).redirects(0).end(function (err, response) {
        if (!err) {
            cookie = response.headers["set-cookie"];
            arr[0] = cookie[0].split(';')[0]
            getImage(cookie[0].split(';')[0])
        } else{
            console.log(err);
        }
    });
}

// getLoginCookie()

function getImage(cookie){
    var browserMsgs={
        "Referer": "http://222.171.146.55/login",
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "Cookie": cookie
    };
    superagent.get(url.login_img_url).set(browserMsgs).end(function (err, response) {
        if (!err) {
            var buffer = response.body
            var base64Str = buffer.toString('base64')
            arr[1] = base64Str;
            console.log(arr)
            // cookies = arr[0];
        } else{
            console.log(err);
        }
    });
}; 


var loginMsg=
{
    j_username: "2016021787",
    j_password: "1",
    j_captcha: "6gc6"
};
function getTarget(){
    var browserMsgss = { 
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        'Content-Type' :'application/x-www-form-urlencoded',
        "Cookie": 'JSESSIONID=abckFYh9lMZj55L9z_69w'
    };
    //j_spring_security_check被重定向到index.jsp中
    superagent.post(url.target_url).set(browserMsgss).send(loginMsg).redirects(0).end(function (err, response) {
        if (!err) {
            // console.log(8)
            getName()
        } else{
            console.log(err);
        }
    });
}

// getTarget()

function getName(){
    var browserMsgs={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        'Content-Type' :'application/x-www-form-urlencoded',
        "Cookie": 'JSESSIONID=abckFYh9lMZj55L9z_69w'
    };
    superagent.post(url.mail_url).set(browserMsgs).send(loginMsg).end(function (err,response) {
        if (!err) {
            var $ = cheerio.load(response.text);
            $('.profile-info-value').each(function (idx, element) {
                
            console.log($(element).text()) 
            });
        } else{
            console.log(err);
        }
    });
}
// getName(cookies)

module.exports.getLoginCookie = getLoginCookie;
module.exports.arr = arr; 
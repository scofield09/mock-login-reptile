var superagent= require("superagent");
var cheerio=require("cheerio");

var  url={
    url:"http://222.171.146.55/",
    login_url:"http://222.171.146.55/login",
    target_url:"http://222.171.146.55/j_spring_security_check"
};

// 浏览器请求报文头部部分信息
var browserMsg={
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
    'Content-Type':'application/x-www-form-urlencoded'
};

// post 参数信息，其中，还差先前分析的 _xsrf 信息
var loginMsg=
{
    j_username: "2016021787",
    j_password: "1",
    j_captcha: "npb2"
};

// 发送登陆请求，获取 cookie 信息
function getLoginCookie() {
    //  首先，需在 set 方法中设置请求报文中参数，以性器官免服务器端有针对非浏览器请求做相关处理
    //  send 方法中设置 post 请求中需提交的参数
    //  redirects 方法调用，其中参数为 0 ，为了避免在用户登陆成功后，引起的页面重新刷新，从而无法获取 cookie
    superagent.post(url.login_url).set(browserMsg).redirects(0).end(function (err, response) {
        if (!err) {
            cookie = response.headers["set-cookie"];
            console.log(cookie);
            var $ = cheerio.load(response.text);
            var items = [];
            $('#loginButton').each(function (idx, element) {
            console.log($(element).val()) 
            });
        } else{
            console.log(err);
        }
    });
}
getLoginCookie()
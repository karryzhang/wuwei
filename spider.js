var http = require("http");
var fs = require("fs");
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://iapi.ipadown.com/api/guwen/guwen.book.show.api.php?bookvid=3311"; 
console.log(url);

function startRequest(x){
     console.log("running");
    http.get(x,function(res){
        var html = '';
        res.setEncoding('utf-8');
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {   
            html += chunk;
        });
         res.on('end', function () {
            var $ = cheerio.load(html);
            var time = new Date();
            var $temp = $('div.son2').find("div").remove();
            content =$temp.html();
            var newsItem = {
          //获取文章的标题
            title: $('div.son1').text().trim(),
         //获取文章发布的时间
            Time: time,   
         //获取当前文章的url
            link: url,
            author:$('#author').text(),
         //获取供稿单位
            content: $('div.son2').text(),  
        //i是用来判断获取了多少篇文章
            i: i = i + 1,     
            };
             console.log(newsItem);

         });
    });
}
startRequest(url);

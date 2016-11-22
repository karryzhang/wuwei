var http = require("http");
var fs = require("fs");
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://iapi.ipadown.com/api/guwen/guwen.book.show.api.php?bookvid="; 
var objArr =[];
var isOver = false;
console.log(url);

function startRequest(x,index){
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
            link:x,
            author:$('#author').text(),
         //获取供稿单位
            content: $('div.son2').text(),  
        //i是用来判断获取了多少篇文章
            i: i = i + 1,     
            };
             //console.log(newsItem);
             objArr[index]=newsItem;
             if(i>=81){
                 console.log("文件写入开始")
                 fs.appendFile("laozi.json",JSON.stringify(objArr),function(err){
                    if(err){
                        console.log("文件写入错误");
                    }else{
                        console.log("文件写入完成");
                    }
                 })
             }

         });
    });
}

function getArticle(start,end){
    var index = 0;
    for(var i=start;i<=end;i++){
        
        startRequest(url+i,index);
        index++;
    }
    isOver = true;
}
getArticle(3310,3390);

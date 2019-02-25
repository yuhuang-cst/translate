/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');
var request = require('request');
var jar = request.jar();

var translate = function(text, callback){
  getCookie("http://www.bing.com/translator/", function(cookieString){
    superagent
      .post("http://www.bing.com/translator/api/Translate/TranslateArray?from=-&to=zh-CHS")
      .set({
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": cookieString
      })
      .send([{text: text}])
      .end(function(err, res){
        if (err){
          console.log('err:', err);
          callback([text]);
        }
        else
          callback(transform(res, text));
      })
  });
};

var transform = function(resultObj, sourceText){
  var transTextList = [];
  try {
    transTextList = resultObj.body.items.map(function(item){
      return item.text;
    });
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? transTextList : [sourceText];
};


var getCookie = function(url, callback){
  request({url: url, jar: jar}, function () {
    var cookieString = jar.getCookieString("http://www.bing.com/translator/");
    callback(cookieString);
  });
};

exports.translate = translate;

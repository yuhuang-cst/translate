/**
 * Created by HY on 2017/2/30.
 */

var baidu = require("./baidu");
var googleCN = require("./googleCN");
var iCIBA = require("./iCIBA");
var youdao = require("./youdao.js");
var bing = require("./bing.js");

var translate = function(apiName, text, callback){
  if (apiName == "BaiDu")
    baidu.translate(text, callback);
  else if (apiName == "GoogleCN")
    googleCN.translate(text, callback);
  else if (apiName == "iCIBA")
    iCIBA.translate(text, callback);
  else if (apiName == "YouDao")
    youdao.translate(text, callback);
  else if (apiName == "Bing")
    bing.translate(text, callback);
  else
    throw new Error("ILLEGAL API");
};

exports.translate = translate;

// translate("BaiDu", "happy", function(transTextList){
//   console.log(transTextList);
// });

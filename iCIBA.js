/**
 * Created by HY on 2017/2/30.
 */


var superagent = require('superagent');

var translate = function(text, callback){
  superagent
    .get("http://www.iciba.com/" + text)
    .end(function(err, res){
      if (err)
        callback(text);
      else
        callback(transform(res, text));
    })
};

reList = [
  /<ul class="base-list switch_part" class="">[\s\S]*?<p>[\s\S]*?<span>(.*?)<\/span>[\s\S]*?<\/p>[\s\S]*?<\/ul>/,
  /<div class="in-base-top clearfix" class="clearfix">[\s\S]*?<div[\s\S]*?>(.*?)<\/div>[\s\S]*?<\/div>/
];

var transform = function(resultObj, sourceText){
  var transTextList = [];
  try {
    for (var i in reList){
      var match = resultObj.text.match(reList[i]);
      if (match) {
        transTextList.push(match[1].replace('；', '').trim());
        break;
      }
    }
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? transTextList : [sourceText];
};

exports.translate = translate;


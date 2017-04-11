/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');

var translate = function(text, callback){
  superagent
    .get("https://translate.google.cn/translate_a/single")
    .query({
      client: "gtx",
      sl: "en",
      tl: "zh-CN",
      dj: 1,
      ie: "UTF-8",
      oe: "UTF-8",
      source: "icon",
      q: text,
      dt: ['t', 'bd']
    })
    .end(function(err, res){
      if (err)
        callback(text);
      else
        callback(transform(res, text));
    })
};

var transform = function(resultObj, sourceText){
  var transTextList = [];
  try {
    transTextList = resultObj.body.sentences.map(function(item){
      return item.trans;
    });
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? transTextList : [sourceText];
};

exports.translate = translate;

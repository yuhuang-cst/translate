/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');

apiKey = "457836948";
keyForm = "HYHYTest";

var translate = function(text, callback){
  superagent
    .get("http://fanyi.youdao.com/openapi.do")
    .query({
      keyfrom: keyForm,
      key: apiKey,
      type: "data",
      doctype: "json",
      version: "1.1",
      q: text
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
    transTextList = resultObj.body.translation;
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? transTextList : [sourceText];
};

exports.translate = translate;

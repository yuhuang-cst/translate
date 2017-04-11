/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');

var translate = function(text, callback){
  superagent
    .get("http://fanyi.baidu.com/v2transapi")
    .query({
      from: "auto",
      to: "zh",
      query: text,
      transtype: "hash",
      simple_means_flag: 3
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
    transTextList = resultObj.body.trans_result.data.map(function(item){
      return item.dst
    });
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? transTextList : [sourceText];
};

exports.translate = translate;

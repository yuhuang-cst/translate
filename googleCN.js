/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');

var translate = function(text, callback){
  getTKK(function(tkk){
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
        dt: ['t', 'bd'],
        tk: getTK(text, tkk)
      })
      .end(function(err, res){
        if (err){
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
    transTextList = resultObj.body.sentences.map(function(item){
      return item.trans;
    });
  } catch (e) {}
  return transTextList && (transTextList.length > 0)? [transTextList.join("")] : [sourceText];
};

// Reference: http://www.cnblogs.com/by-dream/p/6554340.html

var DEFAULT_TKK = '430977.498788511'
var TKK = '';
var getTKK = function(callback){
  if (TKK){
    callback(TKK);
    return;
  }
  superagent
    .get('https://translate.google.cn/')
    .end(function(err, res){
      if (err)
        TKK = DEFAULT_TKK;
      else
        TKK = res.text.match(/tkk:'(\d+\.\d+)'/)[1] || DEFAULT_TKK;
      callback(TKK);
    })
};

var getTK =  function (a,TKK) {
  for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
    var c = a.charCodeAt(f);
    128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
  }
  a = h;
  for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
  a = b(a, "+-3^+b+-f");
  a ^= Number(e[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1E6;
  return a.toString() + "." + (a ^ h)
};

var b = function (a, b) {
  for (var d = 0; d < b.length - 2; d += 3) {
    var c = b.charAt(d + 2),
      c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
      c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
    a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
  }
  return a
};

exports.translate = translate;

// getTKK(function(tkk){
//   console.log(tkk);
//   console.log(TKK);
//   console.log(getTK('hello', tkk));
//   console.log(getTK('hello world', tkk))
// });

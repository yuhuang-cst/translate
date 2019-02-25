/**
 * Created by HY on 2017/2/30.
 */

var superagent = require('superagent');

var url = "http://fanyi.baidu.com/v2transapi";
var token = "d3eba00ed93c7d2838f540c3af29b92c";
var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36";
var cookie = "BAIDUID=01D08B7F39DDF89398A23C4FBC54D4A8:FG=1; BIDUPSID=01D08B7F39DDF89398A23C4FBC54D4A8; PSTM=1547352981; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; BDUSS=HFaUE9GbUt2VG5DbzVyRXNNNlBYS3d-bjlPVEpzenZQTU9KRk9VRFdveEJJM1pjQVFBQUFBJCQAAAAAAAAAAAEAAABOEf0nudbK3rnWyt7Ezsj0us4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEGWTlxBlk5cc; H_WISE_SIDS=126886_127279_128048_114743_125581_128861_120134_123018_118882_118877_118855_118826_118797_107319_129179_127771_129088_117428_128818_128402_129036_127029_128791_129008_128968_128246_129294_129319_129286_129146_127762_128419_124030_110085_123289_127676_127317_128601_128195_129251_128961; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1550392136,1550411644,1550491946,1550905848; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1551021695; from_lang_often=%5B%7B%22value%22%3A%22nl%22%2C%22text%22%3A%22%u8377%u5170%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; BDSFRCVID=MbCOJeC629IatZO9tuYSU74wQe20KcrTH6aIwNdayAZxzkHb8Do8EG0Pef8g0Ku-8Uu8ogKK0mOTHv-F_2uxOjjg8UtVJeC6EG0P3J; H_BDCLCKID_SF=tJIt_CDXfCI3qb8kKnrVh4P-2eT22-us06Td2hcH0KLKMnKGyfubetL_Wxkf2tvK3nr3Wx7MLxb1MRjvXx7ob5_Y0Nb4LMjGaDri3q5TtUJ8JKnTDMRh-6_u-4RyKMniQKv9-pnk2hQrh459XP68bTkA5bjZKxtq3mkjbIOFfD_MMIKmej0hen-W5gT3abj-aD60WJk8Kb7VbPJt5fnkbfJBDR54q6QBJR5-3RC-JbrsHq-4Dp7sQx47yajK2MvDfgckaKoTBpQZjRoR36OpQT8rMR_OK5OibCraoUTyab3vOU3TXpO1X4PzBN5thURB2DkO-4bCWJ5TMl5jDh05y6TXjaDHJTkOfn3fL-08-b3BJJnkq4bohjPILPO9BtQmJJrOLDO1MR8BeJjsK5J_M-_vDlOXJPAqQg-q3R77aUDVfp3kbRrYKUKRef6j0x-jLgnhVn0MW-5D8D06h-nJyUPibPnnBU6W3H8HL4nv2JcJbM5m3x6qLTKkQN3TJMIEtJFq_D_KtCt3fP36qRo8MJL-beT22jnp3nR9aJ5nJD_MDI5LDMPB550gbR_ftnbI54jjap3_QpP-HJ7vqtOSMxc03GrJX4JXLmcPKl0MLn5lbb0xyUQDb-0RKxnMBMPjamOnaPLE3fAKftnOM46JehL3346-35543bRTohFLfC-aMCt6eno_Mt4HqfbQa4JWHDQbsJOOaCvYHlOOy4oTj6j-yfQJXf48bTTkbMK5JP3GeD_xyPbK3MvB-trfWt3KMm6zXPcoWn_WsbA9Qft20-LEeMtjBbLLfNTtVn7jWhk2Dq72ybDVQlRX5q79atTMfNTJ-qcH0KQpsIJMDUC0-nDSHH8qJ50J3H; locale=zh; PSINO=1; delPer=0; H_PS_PSSID=1448_21101_28415";

var translate = function(text, callback){
  superagent
    .get(url)
    .set("Cookie", cookie)
    .set("User-Agent", userAgent)
    .query({
      from: "auto",
      to: "zh",
      query: text,
      transtype: "hash",
      simple_means_flag: 3,
      sign: getSign(text),
      token: token
    })
    .end(function(err, res){
      if (err)
        callback([text]);
      else
        callback(transform(res, text));
    })
};


var getSign = function(text){
  return e(text);
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


// Reference: https://blog.csdn.net/QYmufeng/article/details/84068710
// js from https://fanyi.bdstatic.com/static/translation/pkg/index_9b62d56.js; search keyword: "a.charCodeAt"

var i = "320305.131321201";

function n(r, o) {
  for (var t = 0; t < o.length - 2; t += 3) {
    var a = o.charAt(t + 2);
    a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a), a = "+" === o.charAt(t + 1) ? r >>> a : r << a, r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
  }
  return r
}


function e(r) {
  var o = r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
  if (null === o) {
    var t = r.length;
    t > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(t / 2) - 5, 10) + r.substr(-10, 10))
  } else {
    for (var e = r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/), C = 0, h = e.length, f = []; h > C; C++) "" !== e[C] && f.push.apply(f, a(e[C].split(""))), C !== h - 1 && f.push(o[C]);
    var g = f.length;
    g > 30 && (r = f.slice(0, 10).join("") + f.slice(Math.floor(g / 2) - 5, Math.floor(g / 2) + 5).join("") + f.slice(-10).join(""))
  }
  var u = void 0, l = "" + String.fromCharCode(103) + String.fromCharCode(116) + String.fromCharCode(107);
  u = null !== i ? i : (i = window[l] || "") || "";
  for (var d = u.split("."), m = Number(d[0]) || 0, s = Number(d[1]) || 0, S = [], c = 0, v = 0; v < r.length; v++) {
    var A = r.charCodeAt(v);
    128 > A ? S[c++] = A : (2048 > A ? S[c++] = A >> 6 | 192 : (55296 === (64512 & A) && v + 1 < r.length && 56320 === (64512 & r.charCodeAt(v + 1)) ? (A = 65536 + ((1023 & A) << 10) + (1023 & r.charCodeAt(++v)), S[c++] = A >> 18 | 240, S[c++] = A >> 12 & 63 | 128) : S[c++] = A >> 12 | 224, S[c++] = A >> 6 & 63 | 128), S[c++] = 63 & A | 128)
  }
  for (var p = m, F = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(97) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(54)), D = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(51) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(98)) + ("" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(102)), b = 0; b < S.length; b++) p += S[b], p = n(p, F);
  return p = n(p, D), p ^= s, 0 > p && (p = (2147483647 & p) + 2147483648), p %= 1e6, p.toString() + "." + (p ^ m)
}

exports.translate = translate;

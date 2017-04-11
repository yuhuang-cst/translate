#translate
在线翻译API，包括谷歌、百度、必应、有道、金山词霸，API名分别为`GoogleCN`、`BaiDu`、`Bing`、`YouDao`、`iCIBA`

#下载

```
git clone https://github.com/yu-huang13/translate.git
cd translate
npm install
```

#translateAPI.js使用示例
```
node translateAPI.js BaiDu sampleENG.json sampleCNS.json
```

其中，`BaiDu`为API名，`sampleENG.json`为待翻译的英文单词列表，内容如下：

```
[
  "happy",
  "sad"
]
```
`sampleCNS.json`指定程序的输出文件名，内容为程序翻译的中文单词列表

#translate.js使用示例
```
var t = require('./translate.js')
t.translate("BaiDu", "happy", function(transTextList){
  console.log(transTextList);
});
```





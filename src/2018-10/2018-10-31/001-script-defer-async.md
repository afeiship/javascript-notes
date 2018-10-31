# script defer async:

![](https://ws2.sinaimg.cn/large/006tNbRwly1fwrq8o5536j30lv0m8gnq.jpg)


## 正常的 html 里遇到 script 
1. 先解析 html
2. script 下载
3. script 执行
4. html 继续下载


## 如果 script 加了 async 属性之后
1. 解析 html
2. 遇到 script 继续下载 html  1、2 是同时进行的
3. script 执行， html 解析停止
4. html 继续解析

## script defer:
1. 解析 html 
2. 同时 下载 scirpt
3. 等html 解析完成之后
4. 最后执行



## 详情解析：
+ https://www.cnblogs.com/xuechenlei/p/5947555.html

```conf
所以相对于默认的script引用，这里配合defer和async就有两种新的用法，它们之间什么区别那？
　　1.默认引用 script: <script type="text/javascript" src="x.min.js"></script>
　　当浏览器遇到 script 标签时，文档的解析将停止，并立即下载并执行脚本，脚本执行完毕后将继续解析文档。
 
　　2.async模式 <script type="text/javascript" src="x.min.js" async="async"></script>
　　当浏览器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，脚本执行的过程中文档将停止解析，直到脚本执行完毕。

　　3.defer模式 <script type="text/javascript" src="x.min.js" defer="defer"></script>
　　当浏览器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，待到文档解析完成，脚本才会执行。
 
　　所以async和defer的最主要的区别就是async是异步下载并立即执行，然后文档继续解析，defer是异步加载后解析文档，然后再执行脚本，这样说起来是不是理解了一点了；
　　它们的核心功能就是异步，那么两种属性怎么去区分什么情况下用哪个那，主要的参考是如果脚本不依赖于任何脚本，并不被任何脚本依赖，那么则使用 defer，如果脚本是模块化的，不依赖于任何脚本，那么则使用 async；主要功能点说完了，小伙伴们有没有分清楚他们的区别了那。
```

## 注意的点：
1. async 是加载完就立即执行了，所以，如果你的脚本是有依赖顺序，这种就要考虑了，因为这个并不能保证顺序
2. async/defer 都只支持外联脚本，并不支持 inline 脚本
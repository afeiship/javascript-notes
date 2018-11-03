# HTTP 304(Not Modified)和200(From Cache)的区别
+ https://segmentfault.com/a/1190000006772793

## 触发条件：
200(From cache)是直接点击链接访问，输入网址按回车访问触发(这两种情况都不会有Etag)；
304(Not Modified)是刷新页面时触发，或是设置了长缓存、或当Etag没有移除时触发。

## 先说说304
当你第一次请求一个资源的时候，server会同时生成并返回一个字符串在响应头里，叫Etag。
浏览器接到资源后，缓存资源的同时也会把这个Etag保存下来，成为If-None_Match 。
Etag可以看作是一个资源的唯一标识，当你第二次请求这个资源的时候，请求头里会带着这个Etag,server会拿server该资源现在的Etag跟请求头中的If-None_Match做对比，然后看看If-Modified-Since过没过期，如果一样，直接告诉他：你就用本地的吧，我没变，就不给你返回了。所以返回了304，304就是这样。



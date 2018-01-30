# http2.0
> Http 2.0

## resources:
+ https://www.zhihu.com/question/34074946
+ http://blog.csdn.net/zqjflash/article/details/50179235
+ https://www.zhihu.com/question/65900752/answer/255085226


## http1.x的“队首阻塞”
```conf
这里所说的HTTP 1.x 中存在的队首阻塞和TCP协议的队首阻塞是两回事。
HTTP 1.x 协议只能严格串行地返回请求，不允许一个连接上的多个响应数据交错到达，因而一个响应必须完全返回后，下一个响应才会开始传输。
你看的那本书11.2节 HTTP管道，详细讲解了这个事情。
当然，你也可以通过同时打开多个TCP连接来绕过HTTP应用协议的这个限制。
这在 11.3节 使用多个TCP连接 中也详细讲解了。
```
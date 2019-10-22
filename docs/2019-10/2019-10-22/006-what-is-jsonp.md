# what is jsonp
- 请说明 JSONP 的工作原理，它为什么不是真正的 Ajax？

## jsonp 原理
JSONP 是一种【请求一段 JS 脚本，把执行这段脚本的结果当做数据】的玩法。

## 为啥不能用 POST：
`所以，你能 POST 一段通过 script 标签引入的脚本吗？`
（如果看过 JSONP 库的源码就知道，常见的实现代码其实就是 document.createElement(‘script’) 生成一个 script 标签，然后插 body 里而已。在这里根本没有设置请求格式的余地）。


JSONP（带填充的 JSON）是一种通常用于绕过 Web 浏览器中的跨域限制的方法，因为 Ajax 不允许跨域请求。
JSONP 通过<script>标签发送跨域请求，通常使用callback查询参数，例如：https://example.com?callback=printData。 然后服务器将数据包装在一个名为printData的函数中并将其返回给客户端。

<!-- https://mydomain.com -->
<script>
function printData(data) {
  console.log(`My name is ${data.name}!`);
}
</script>

<script src="https://example.com?callback=printData"></script>
// 文件加载自 https://example.com?callback=printData
printData({ name: 'Yang Shun' });
客户端必须在其全局范围内具有printData函数，并且在收到来自跨域的响应时，该函数将由客户端执行。
JSONP 可能具有一些安全隐患。由于 JSONP 是纯 JavaScript 实现，它可以完成 JavaScript 所能做的一切，因此需要信任 JSONP 数据的提供者。
现如今，跨来源资源共享（CORS） 是推荐的主流方式，JSONP 已被视为一种比较 hack 的方式。


## 背后其实在进行
1. 拼接一个script标签，，从而触发对指定地址的GET请求
2. 那服务器端对这个GET请求进行处理，并返回字符串 “myCallback(‘response value’)”
3. 那前端script加载完之后，其实就是在script中执行myCallback(‘response value’)
4. 是不是就完成了跨域的请求，
5. 是不是就是只能用GET

所以jsonp不会对服务器端代码或者内容做更改，因为它只能发送get请求

## resources
- https://blog.csdn.net/shuidinaozhongyan/article/details/78155543
- https://blog.csdn.net/shuidinaozhongyan/article/details/78155693
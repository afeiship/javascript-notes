## ajax:
+ 创建 xhr 对象
+ GET/POST
+ 这里主要是open/send发送
+ 监听一些状态

## resources:
+ https://www.cnblogs.com/colima/p/5339227.html

## GET:
```js
xhr.open('get', url, async);
xhr.send();
```

## POST:
```js
xhr.open('post', url, async);
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
xhr.send(data);
```

## 状态event：
```js
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 204) {
            callBacks(xhr.responseText);
        } else {
            alert('出错了,Err：' + xhr.status);
        }
    }
};
```


## 关于POST/GET:
```conf
method：发送请求所使用的方法（GET或POST）；
与POST相比，GET更简单也更快，并且在大部分情况下都能用；
然而，在以下情况中，请使用POST请求：
无法使用缓存文件（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 没有数据量限制）
发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
```

## 关于URL：
> 规定服务器端脚本的 URL(该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）)；

## 关于async:
> 规定应当对请求进行异步（true）或同步（false）处理；true是在等待服务器响应时执行其他脚本，当响应就绪后对响应进行处理；false是等待服务器响应再执行。


## send:
> send() 方法可将请求送往服务器。

## onreadystatechange
> 存有处理服务器响应的函数，每当 readyState 改变时，onreadystatechange 函数就会被执行。

## readyState
```conf
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
```

## responseText:
> 获得字符串形式的响应数据。

## setRequestHeader()：
```conf
POST传数据时，用来添加 HTTP 头，然后send(data)，注意data格式；
GET发送信息时直接加参数到url上就可以，比如url?a=a1&b=b1。
```

## 自己的ajax实现：(Tencent jx 框架)
```js
requestSuccess: function () {
    var xhr = this.xhr;
    try {
        return (!xhr.status && location.protocol == "file:")
        || (xhr.status >= 200 && xhr.status < 300)
        || (xhr.status == 304)
        || (navigator.userAgent.indexOf("Safari") > -1 && typeof xhr.status == "undefined");
    } catch (e) {
    }
    return false;
}
```
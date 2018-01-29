# ajax
> ajax documents.


## 知识点：
```conf
XMLHttpRequest() 这个对象可以在不重新加载页面的情况下从后台获取数据，支持的浏览器有IE7+、Firefox、Chrome、Safari 以及 Opera
ActiveXObject(“Microsoft.XMLHTTP”) 这个对象是针对老式ie浏览器的
onreadystatechange事件 当readyState的值发生改变时触发此事件
open() 这个方法有三个参数，open("提交方式 get/post","资源的地址",异步或者同步 true/false);
```

## readyState 准备状态
```conf
0 （未初始化）对象已建立，但是尚未初始化（尚未调用open方法）
1（初始化）已调用send()方法，正在发送请求
2（发送数据）send()方法调用完成，但是当前的状态及http头未知
3（数据传送中）已接收部分数据，因为相应及http头不全，这时通过responseText获取部分数据会出现错误
4（完成）数据接收完成，此时可以通过responseText获取完整的数据
```


## status 请求状态 
```conf
200/304（成功）
404（没有发现文件）
404（没有发现文件）
500（服务器内部错误）
```
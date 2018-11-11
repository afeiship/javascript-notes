# 构建 Web 应用之 Service Worker 初探
> https://www.jianshu.com/p/0e2dee4c77bc

## 诞生之初，JavaScript 是单线程的
进程有私有的虚拟地址空间、代码、数据和其它系统资源，进程申请创建和使用的系统资源会随其终止而销毁。
线程运行在进程之中，系统创建进程之后就开始启动执行进程的主线程，并随主线程的退出而终止。

### 操作 DOM，所以需要设计成单线程？
`JavaScript 作为浏览器脚本语言，为方便准确无误的操作 DOM，诞生之初便采用了单线程的方式`
举个例子，若多线程同时分别删除和修改同一个 DOM，我们很难预知其执行结果。

## 但单线程中，必须通过异步和回调来优化耗时操作
我们在网页上提交一个表单，并不希望在提交后页面卡顿，一直等待服务端返回的提交结果。这时我们需要能在单线程中发送异步请求，点击提交表单后可以先在页面进行其他操作。

Ajax 让我们可以向后端发送异步请求，同时不影响用户在界面中继续操作。当 Ajax 接收到服务端的响应之后，便通过回调函数执行之后的操作。一个典型的异步 Ajax 实战场景如下：
```js

// 生成可发送同步/异步请求的 XMLHttpRequest 对象实例
var oReq = new XMLHttpRequest();
// open 方法初始化请求方法、地址，第三个参数 true 声明进行异步请求
oReq.open("GET", "http://www.jianshu.com/", true);
// 请求的整个过程中有五种状态，且同一时刻只能存在一种状态：
// 1. 未打开
// 2. 未发送
// 3. 已获取响应体
// 4. 正在下载响应体
// 5. 请求完成
// 当请求状态发生改变时，触发 onreadystatechange 会被调用
oReq.onreadystatechange = function (oEvent) {
  // 如果已经开始下载响应体了
  if (oReq.readyState === 4) {
    // 如果响应体成功下载，并且服务端返回 200 状态码
    if (oReq.status === 200) {
      // 打印响应信息
      console.log(oReq.responseText);
    } else {
      console.log("Error", oReq.statusText);
    }
  }
};
// send 方法发送请求，由于此请求是异步的，该方法立刻返回
oReq.send(null);
```
当我们的多个请求需要依赖于上一个请求的服务端响应时，回调函数中 Ajax 的层级逐步提高，可维护性极度下降，这就是回调地狱。

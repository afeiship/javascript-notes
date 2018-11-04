# 浏览器之HTTP缓存的那些事
+ https://segmentfault.com/a/1190000016546106


# 缓存是提升用户访问速度，节省带宽，减轻服务器压力的必经之道。
> 下面都是针对的Http 1.1来说明，HTTP缓存都是针对浏览器客户端，其他第三方客户端不考虑。


## 什么是浏览器缓存
简单来说，浏览器缓存就是把一个已经请求过的Web资源（如html，图片，js）拷贝一份副本储存在浏览器中。缓存会根据进来的请求保存输出内容的副本。当下一个请求来到的时候，如果是相同的URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求（当然还有304的情况）。

## 缓存的原理：
缓存是根据url来处理的，只要url不一样就是新的资源。

## 浏览器HTTP执行机制
浏览器对于请求资源, 拥有一系列成熟的缓存策略。
只要有相应的缓存响应头（要求缓存），浏览器客户端都会对资源缓存一份，当然缓存响应头也有优先级的。

## 缓存模式
浏览器缓存可以分为两种模式，强缓存和协商缓存。

### 强缓存
强缓存（无HTTP请求，无需协商）
直接读取本地缓存，无需跟服务端发送请求确认，http返回状态码是200（from memory cache或者from disk cache ，不同浏览器返回的信息不一致的）。
对应的Http header有:
Cache-Control
Expires


### 协商缓存
协商缓存（有HTTP请求，需协商）
浏览器虽然发现了本地有该资源的缓存，但是不确定是否是最新的，于是想服务器询问，若服务器认为浏览器的缓存版本还可用，那么便会返回304（Not Modified） http状态码。
对应的Http header有:

Last-Modified
ETag

## 流程图
流程图只考虑了200和304的状态码，其他异常状态码不考虑

![](https://ws2.sinaimg.cn/large/006tNbRwly1fwvth49b92j30jr0i5wfv.jpg)

## 缓存相关的Http Header
> Http Header包括请求头和响应头，http1.1会向前兼用的，会兼容http1.0的Http header，浏览器还有web服务一般都会考虑进去

### Cache-Control
浏览器缓存里, Cache-Control是金字塔顶尖的规则, 它藐视一切其他设置, 只要其他设置与其抵触, 一律覆盖之.

不仅如此, 它还是一个复合规则, 包含多种值，同时在请求头和响应头都可设置（基本都可以）。

下面列举了常用的Cache-Control用法。

Cache-Control	描述
no-store	请求和响应都不缓存
no-cache	相当于max-age:0，即资源被缓存, 但是缓存立刻过期, 同时下次访问时强制验证资源有效性
max-age	缓存资源, 但是在指定时间(单位为秒)后缓存过期

### Expires
http1.0中存在的字段，该字段所定义的缓存时间是相对服务器上的时间而言的，如果客户端上的时间跟服务器上的时间不一致（特别是用户修改了自己电脑的系统时间），那缓存时间可能就没啥意义了。
在HTTP 1.1版开始，使用Cache-Control: max-age=秒替代，这样就不存在不一致问题了。

### Last-Modified
Last-Modified和If-Modified-Since是一对的。

当浏览器第一次请求一个url时，服务器端的返回状态码为200，同时HTTP响应头会有一个Last-Modified标记着文件在服务器端最后被修改的时间。
浏览器第二次请求上次请求过的url时，浏览器会在HTTP请求头添加一个If-Modified-Since的标记，用来询问服务器该时间之后文件是否被修改过。

### 但是Last-Modified是http1.0的产物，有两个缺点：

1. 只能精确到秒级别
2. 内容完全没改变的资源文件，无法识别出来（只要修改时间变了，就算变动）。所有就有了ETag。


## ETag
ETag解决了Last-Modified的缺点，http1.1的字段，优先级高于Last-Modified。

理论上是ETag优先于Last-Modified，但是Nginx一会把这两个一起开启一起验证，而且Nginx ETag的计算方式把最后修改时间也算进去了（所有这个算是弱ETag）。

Nginx ETag计算方式：计算页面文件的最后修改时间，将文件最后修改时间的秒级Unix时间戳转为16进制作为etag的第一部分 计算页面文件的大小，将大小字节数转为16进制作为etag的第二部分。
ETag有两种类型：

### 强ETag
强ETag值，不论实体发生多么细微的变化都会改变其值。
强ETag表示形式："22FAA065-2664-4197-9C5E-C92EA03D0A16"。

### 弱ETag
弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变产 生差异时才会改变 ETag 。这时，会在字段值最开始处附加 W/。

弱ETag表现形式：W/"22FAA065-2664-4197-9C5E-C92EA03D0A16"。

ETag和If-None-Match是一对:

当浏览器第一次请求一个url时，服务器端的返回状态码为200，`同时HTTP响应头会有一个Etag，存放着服务器端生成的一个序列值`。

浏览器第二次请求上次请求过的url时，`浏览器会在HTTP请求头添加一个If-None-Match的标记，用来询问服务器该文件有没有被修改`。

> 一般网站都会把Last-Modified和ETag一起用，同时对对比，两个条件都满足了才会返回304。

## ETag和Last-Modified例子
由于Nginx ETag可知，ETag比Last-Modified多了文件大小比较，`理论上有ETag就可以不用Last-Modified，但是为了兼容http1.0，很多web服务器都会带上Last-Modified`。


## Etag关闭如下:

etag off;
Last-Modified关闭如下（没有找到具体关闭方式，只好在响应头中直接赋值为空）：

add_header 'Last-Modified' '' always;
这些配置，可以随便设置在不同层级，http、server、location都可以。


## 默认的Nginx是同时开启的，所以不用处理什么。
```conf
server {
  listen       80;
  server_name  localhost;
  location / {
    #定义自己的web服务根目录
    root   /Users/Sam/www;
    #默认访问文件夹时，访问index.html或者index.htm文件
    index  index.html index.htm;
    location ~* \.(jpg|jpeg|gif|bmp|png|js|css){
      #nginx在没有设置Cache-Control：max-age=xxx和expires时，
      #谷歌访问后，后面会变成200(from memory cache)，
      #然后就造成了文件修改后无法更新的问题。
      #这个很好解决，只要设置过期时间为0，这样就一定不是强缓存，就不存在这些问题
        expires 0s;
    }
  }
}
```

## 不需要缓存的场景
缓存是会提升访问速度、节省带宽、减轻服务器压力，但是也不能滥用，否则会出现一些意想不到的问题。图片、css、js等资源文件一般都是需要缓存的，但是像接口数据等数据会变动的http请求都是不需要缓存的，否则会造成无法访问到新数据的情况。

### 场景
html文件不需要强缓存，协商缓存就行了。
这些都是特殊情况，html文件可以返回304状态，但是不要返回200（from memory cache）。html文件最好设置过期时间为0，强制跟服务器做文件修改对比（当然具体场景具体分析）。
因为js文件和css文件是可以使用版本做控制或者随机数。

js代码版本迭代更新
这个场景不是不需要缓存，而是更新了js代码版本，但是如果用户还在缓存期内，就会导致页面出错。
这种情况就需要进行js类库版本控制，如：

<script src="../js/jquery.js?version=1.8.9"></script>
升级到到2.0.0时，我们需要把代码改成

<script src="../js/jquery.js?version=2.0.0"></script>
这样就不会访问到缓存的jquery.js。缓存是根据url来处理的，只要url不一样就是新的资源。

前后端使用ajax请求接口数据

### 解决方式
Url添加随机数
这种情况，是前端做处理。

请求头添加Cache-Control: no-cache
为了兼容http1.0，而外添加Pragma: no-cache，Cache-Control的选项有很多，具体如何选择，看场景。

前端或者服务端都可以处理。
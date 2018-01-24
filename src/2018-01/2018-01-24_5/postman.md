# postman
> postman中 form-data、x-www-form-urlencoded、raw、binary的区别

## resouces:
+ http://blog.csdn.net/ye1992/article/details/49998511

## 默认情况：
> 在没有type=file时候，用默认的 application/x-www-form-urlencoded 就行。
```conf
form的enctype属性为编码方式，常用有两种： application/x-www-form-urlencoded 和 multipart/form-data 
默认为application/x-www-form-urlencoded

当action为post时候，浏览器把form数据封装到http body中，然后发送到server。
如果没有 type=file 的控件，用默认的 application/x-www-form-urlencoded 就可以了。
但是如果有 type=file 的话，就要用到 multipart/form-data 了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file)、Content-Type(默认为text/plain)、name(控件name)等信息，并加上分割符(boundary)。
```

## form-data:
```conf
场景：文件上传，可以是多个文件；
就是http请求中的multipart/form-data,它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。
既可以上传键值对，也可以上传文件。当上传的字段是文件时，会有Content-Type来表名文件类型；content-disposition，用来说明字段的一些信息；
由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。
```

## x-www-form-urlencoded
```conf
就是application/x-www-form-urlencoded,会将表单内的数据转换为键值对，比如,name=java&age = 23

HTTP协议表现如下：


POST HTTP 1.1
HOST: 192.168.30.91 
Cache-Control: no-cache
Content-Type: application/x-www-form-url-urlencoded

name=java&age = 23
```



## raw/text/plain
> 可以上传任意格式的文本，可以上传text、json、xml、html等
```conf
POST HTTP 1.1
HOST: 192.168.30.91 
Cache-Control: no-cache

{ "name": "fei", "age": 100 }
```

## binary
```conf
相当于Content-Type:application/octet-stream,
从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。
```


## multipart/form-data与x-www-form-urlencoded区别
```conf
multipart/form-data：既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息；
x-www-form-urlencoded：只能上传键值对，并且键值对都是间隔分开的。
```
               
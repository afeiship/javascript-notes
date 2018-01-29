# jsonp

## resources:
+ http://blog.csdn.net/liyujia6636/article/details/79123704

## 知识点
```conf
jsonp原理
通过html中的script标签的跨域能力实现与服务器端的数据交互，解决ajax不能跨域的缺点。
后端使用php编程，前端传输一个回调函数的名字，php中通过echo这个函数，可以实现在前端执行这个回调函数。

个人觉得，这技术已经没啥意义了。
```

## 前端实现：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script>
        window.callback_jsonp = function (flag) {
            clearTimeout(window.jsonp_timer);
            console.log('请求成功');
        };
        // 3s超时处理,避免服务器端出错
        window.jsonp_timer = setTimeout(function () {
            window.callback_jsonp = function () {
                console.log('jsonp请求超时后返回数据');
            };
            console.log('jsonp请求超时');
        }, 3000);
        var new_script = document.createElement('script');
        new_script.src = "//localhost/index.php?callback=window.callback_jsonp";
        document.body.appendChild(new_script);
        console.log('jsonp请求');
    </script>
</body>
</html>
```



## 后端实现：
```php
<?php
    $data = true;
    $callback = $_GET['callback'];
    sleep(10);
    echo $callback.'('.json_encode($data).')';
?>
```
# JS解惑-Object中的key是有序的么
> 注意：此文观点未经过严格验证！！！！！


## Object的key的排序规则到底是什么样子的呢？

1. 如果key是整数（如：123）或者整数类型的字符串（如：“123”），那么会按照从小到大的排序。
2. 除此之外，其它数据类型，都安装对象key的实际创建顺序排序。
3. 另外，如果key中除了整数或者整数类型的字符串外，还含有其它数据类型，则整数放在最前面，比如：


## 保持顺序
```js
// 每个key后面加.转换成字符串
var obj = {
    '-1.': '全部',
    '0.' : '正常',
    '1.' : '失效'
};
for (let key in obj) {
    // ~~ 表示转换成整数，这样上面的key又还原成了-1/0/1
    console.log(~~key, obj[key]);
};
// result
// -1 全部
// 0 正常
// 1 失效
```

## resources
- https://juejin.im/post/5cceea34f265da03474e147b
- http://javascript.info/object#ordered-like-an-object
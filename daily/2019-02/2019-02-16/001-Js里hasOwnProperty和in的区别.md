# Js里hasOwnProperty和in的区别
- https://www.jianshu.com/p/19764422baa8

1. hasOwnProperty
用法：`obj.hasOwnProperty(key)   //obj为对象 key为所要判断的字符串`
判断一个对象属性里是否包含某个key，key为字符串,此方法不会去判断原型
```js
var obj={
    key:123
};
obj.hasOwnProperty('key');                             //true
obj.hasOwnProperty('hasOwnProperty');                  //false
```

2. in
key in obj   //obj为对象 key为所要判断的字符串`
判断一个对象属性或原型里面是否包含某个key，key为字符串
```js
var obj={
    key:123
};
'key' in obj;                                           //true
'hasOwnProperty' in obj;                                //true
```

## 区别在于：
```js
Object.getOwnPropertyDescriptors(obj)

// key:
// configurable: true
// enumerable: true
// value: 123
// writable: true
```
# Reflect.defineProperty
- https://www.cnblogs.com/diligenceday/p/5474126.html

## Reflect.defineProperty() 与 Object.defineProperty()
> 两个是一样的，都是直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。唯一不同在于返回 Boolean 值。

## example:
```js
var obj ={}
var des1 = Object.defineProperty(obj,"key1",{
    value:"value1",
    writable:false
});

var des2 = Reflect.defineProperty(obj,"key2",{
    value:"value2",
    writable:false
});

typeof des1 
typeof des2 
```

<img width="500" src="https://ws4.sinaimg.cn/large/006tNc79gy1fywzhlcqe3j30kk0gwabu.jpg" />

## 看看这个还有哪些方法：
<img width="500" src="https://ws3.sinaimg.cn/large/006tNc79gy1fywzjcunjtj310u0eg446.jpg" />


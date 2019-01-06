# writable / set/get/value
> 属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。默认为false。

## 注意：
> 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。 

## 默认值
> get或set不是必须成对出现，任写其一就可以。如果不设置方法，则get和set的默认值为undefined

## 兼容性：
- 在 `ie8下只能在DOM对象上使用` ，尝试在原生的对象使用 Object.defineProperty()会报错。


## resouces:
+ https://segmentfault.com/a/1190000007434923

## 组合1： value + writable
```js
var obj ={}
Object.defineProperty(obj,"key1",{
    value:"value1",
    writable:false
});
```

## 组合2： set+get
```js
var obj ={}
Object.defineProperty(obj,"key1",{
    get(){
        return 'value2'
    }
});
```


## 给一个  readonly 赋值情况如下：
```js
var obj ={}
Object.defineProperty(obj,"key1",{
    value:"value1",
    writable:false
});
obj.key1='sdfsdf'
// "sdfsdf"
// 不过，并不成功

console.log(obj.key1) // ==> 'value1'
```
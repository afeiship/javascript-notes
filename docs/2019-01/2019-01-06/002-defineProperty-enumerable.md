# enumerable
> 此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false。

```js
var obj = {}
//第一种情况：enumerable设置为false，不能被枚举。
Object.defineProperty(obj,"key1",{
    value:"value1",
    enumerable:true
});

Object.defineProperty(obj,"key2",{
    value:"value2",
    enumerable:false
});

// ['key1']
Object.keys(obj)

// console.log `key1`
for( var i in obj){
    console.log(i)
}

```
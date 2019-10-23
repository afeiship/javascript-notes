# getOwnPropertyDescriptor
> 该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```js
var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptor(person, 'name'); 
console.log(desc)  结果如下
// {
//     configurable: true,
//     enumerable: true,
//     writable: true,
//     value: "张三"
// }
```

## getOwnPropertyDescriptors
```js
var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptors(person); 
console.log(desc)
```

<img width="500" src="https://ws3.sinaimg.cn/large/006tNc79gy1fywz774u4lj30bi0byt9k.jpg" />
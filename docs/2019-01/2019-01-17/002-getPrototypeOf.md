# getPrototypeOf
> 返回对象 `__proto__` 指向的原型 `prototype`

## 用法：
> Object的静态方法，使用如下 `Object.getPrototypeOf(object)`

```js
function Fn(){
}
var fn = new Fn();
//通过getPrototypeOf静态方法，获得对象fn的prototype
var proto = Object.getPrototypeOf(fn);
//将获得的prototype添加一个name属性，并赋值
proto.name = 'Monkey';
//输出对象fn.name
console.log(fn.name);
//判断proto是否是Fn.prototype
console.log( 'proto === Fn.prototype? ' + (proto === Fn.prototype) );
//判断fn的__proto__是否指向了prototype
console.log( proto.isPrototypeOf(fn));
```

## 可能取到的一些值：
- 普通的 prototype 对象
- null 值

```js
var obj = { name:'fei'};
var nilObj = Object.create(null);

Object.getPrototypeOf(obj)
Object.getPrototypeOf(nilObj)
```
## 调试截图：
<img width="500" src="https://ws2.sinaimg.cn/large/006tNc79ly1fz9iww84eej30p80jejv0.jpg" />
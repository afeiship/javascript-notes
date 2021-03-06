# __proto__
> 每个对象的 `__proto__` 属性指向自身构造函数的 `prototype`

## 以下三点需要谨记
1. 每个对象都具有一个名为__proto__的属性；
2. 每个构造函数（构造函数标准为大写开头，如Function()，Object()等等JS中自带的构造函数，以及自己创建的）都具有一个名为prototype的方法（注意：既然是方法，那么就是一个对象（JS中函数同样是对象），所以prototype同样带有__proto__属性）；
3. 每个对象的__proto__属性指向自身构造函数的prototype；

## example:
```js
var obj = { name: 'fei' };
obj.__proto__ === (obj.constructor).prototype
// （自身）
obj.__proto__ === Object.getPrototypeOf(obj)

// Object.prototype.isPrototypeOf(obj)
```

## polyfill:
- https://stackoverflow.com/questions/2242518/how-can-i-see-a-javascript-objects-prototype-chain
- https://johnresig.com/blog/objectgetprototypeof/
```js
if ( typeof Object.getPrototypeOf !== "function" ) {
  if ( typeof "test".__proto__ === "object" ) {
    Object.getPrototypeOf = function(object){
      return object.__proto__;
    };
  } else {
    Object.getPrototypeOf = function(object){
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    };
  }
}

```
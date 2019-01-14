# Object.create 兼容

## 原理版：
> https://segmentfault.com/q/1010000008083765
```js
Object.prototype.create = function(obj) {
    if (typeof obj != 'object') {//如果 obj 参数不是 nll 或一个对象值，则抛出一个 TypeError 异常。
        throw TypeError('Object prototype may only be an Object or null');
    }
    if(Object.prototype.create) {
        return Object.prototype.create; //浏览器支持就直接返回
    }else {
        alert(11);
        function Temp() {}//创建一个临时性的构造函数
        Temp.prototype = obj; //传入的参数作为构造函数的原型
        return new Temp(); //返回临时类型的一个新实例
    }
};
```

## MDN 精化版
> https://segmentfault.com/q/1010000002919613
> https://blog.csdn.net/wuweitiandian/article/details/54925055
```js
if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}
```
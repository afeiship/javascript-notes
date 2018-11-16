# Object.defineProperty

- https://www.cnblogs.com/asdfq/p/7011396.html
- https://www.cnblogs.com/mingweiyard/p/7481767.html

```
对象是由多个名/值对组成的无序的集合。对象中每个属性对应任意类型的值。
定义对象可以使用构造函数或字面量的形式：
```

```js
var obj = new Object(); //obj = {}
obj.name = "张三"; //添加描述
obj.say = function() {}; //添加行为
```

除了以上添加属性的方式，还可以使用 Object.defineProperty 定义新属性或修改原有的属性。

## 语法：

Object.defineProperty(obj, prop, descriptor)
参数说明：

```
obj：必需。目标对象
prop：必需。需定义或修改的属性的名字
descriptor：必需。目标属性所拥有的特性
```

## 返回值：

```
传入函数的对象。即第一个参数obj
针对属性，我们可以给这个属性设置一些特性，比如是否只读不可以写；是否可以被for..in或Object.keys()遍历。
给对象的属性添加特性描述，目前提供两种形式：`数据描述和存取器描述`。
```

### 数据描述 descriptor

```js
var obj = {};
Object.defineProperty(obj, "newProp", {
  writable: false, // 默认为 false
  configurable: false, // 默认为 false
  enumerable: false, // 默认为 false
  value: null,
  get: function() {},
  set: function() {}
});
```

```
其中的 configurable 和 writable 比较让人混淆。
configurable 给的说明是 如果为 false , 那么不可以修改, 不可以删除.
但 writable 给的说明是如果设置为 false, 不可以采用 数据运算符 进行赋值
```

## 相关说明：

1. writable,这个默认为 false,如果不改，不可以采用 数据运算符 进行赋值，不可以删除

```js
var obj = {};
Object.defineProperty(obj, "newProp", {});
// newProp 的值为 undeinfed
// delete obj.newProp --> false
```

2. configurable 这个控制它的删除特性

```js
var obj = {};
Object.defineProperty(obj, "newProp", {
  configurable: true
});
// newProp 的值为 undeinfed
// delete obj.newProp --> true
```

3. enumerable 这个控制是否可被 枚举，在 js 里就是控制是否可被 for in 来循环的：

```js
var obj = {};
Object.defineProperty(obj, "newProp", {});

for (var key in obj) {
  console.log(key);
}
// 这里的输出是一个undefined
// for in 是没有进入的
```

4. value: 这个与 get/set 并不能并存，如果有 get/set 存在， value 就会被忽略，自动取 get/set 的值

```js
var obj = {};
Object.defineProperty(obj, "newProp", {
  get: function() {
    return "newProp-value";
  }
});
```

5. 一种错误的形式 value/set/get 并不能同时写
```js
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
var obj = {};
Object.defineProperty(obj, "newProp", {
  value: 123,
  get: function() {
    return "newProp-value";
  }
});
```

6. 另一种不合适的写法： writable/set/get 并不能同时出现
```js
// Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,
var obj = {};
Object.defineProperty(obj, "newProp", {
  writable: true,
  get: function() {
    return "newProp-value";
  }
});
```
# 理解 JavaScript 中的 for…of 循环
+ http://www.cnblogs.com/m2maomao/p/7743143.html


## 什么是 for…of 循环
- for...of 语句创建一个循环 来迭代 可迭代 的对象。
- 在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。
- for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。


## 语法
```js
for (variable of iterable) {
    statement
}
// variable：每个迭代的属性值被分配给该变量。
// iterable：一个具有可枚举属性并且可以迭代的对象。
```

## for...of 遍历数组
> 其结果就是打印出 iterable 数组中的每一个值。
```js
const iterable = ['mini', 'mani', 'mo'];
for (const value of iterable) {
  console.log(value);
}
```

## Map(映射)
> Map 对象就是保存 key-value(键值) 对。对象和原始值可以用作 key(键)或 value(值)。Map 对象根据其插入方式迭代元素。换句话说， for...of 循环将为每次迭代返回一个 key-value(键值)数组。
```js
// map-example.js
const iterable = new Map([['one', 1], ['two', 2]]);
 
for (const [key, value] of iterable) {
  console.log(`Key: ${key} and Value: ${value}`);
}
```

## Set(集合)
- Set(集合) 对象允许你存储任何类型的唯一值，这些值可以是原始值或对象。 
- Set(集合) 对象只是值的集合。 Set(集合) 元素的迭代基于其插入顺序。 
- Set(集合) 中的值只能发生一次。如果您创建一个具有多个相同元素的 Set(集合) ，那么它仍然被认为是单个元素。

```js
const iterable = new Set([1, 1, 2, 2, 1]);
 
for (const value of iterable) {
  console.log(value);
}
```

## String(字符串)
> 字符串用于以文本形式存储数据。
```js
// string-example.js
const iterable = 'javascript';

for (const value of iterable) {
  console.log(value);
}
```
 
## Arguments Object(参数对象)
> 把一个参数对象看作是一个类数组(array-like)对象，并且对应于传递给函数的参数。这是一个用例：
```js
// arguments-example.js
function args() {
  for (const arg of arguments) {
    console.log(arg);
  }
}
```

## Generators(生成器)
> 生成器是一个函数，它可以退出函数，稍后重新进入函数。

```js
// generator-example.js
function* generator(){ 
  yield 1; 
  yield 2; 
  yield 3; 
}; 
 
for (const g of generator()) { 
  console.log(g); 
}
```

## 退出迭代
> JavaScript 提供了四种已知的终止循环执行的方法：break、continue、return 和 throw。让我们来看一个例子：

```js
const iterable = ['mini', 'mani', 'mo'];
 
for (const value of iterable) {
  console.log(value);
  break;
}
 
// Output:
// mini

//在这个例子中，我们使用 break 关键字在一次执行后终止循环，所以只有 mini 被打印出来。
```

## 普通对象不可迭代
for...of 循环仅适用于迭代。 而普通对象不可迭代。 我们来看一下：
```js
const obj = { fname: 'foo', lname: 'bar' };
// TypeError: obj[Symbol.iterator] is not a function
for (const value of obj) { 
    console.log(value);
}
```

在这里，我们定义了一个普通对象 obj ，并且当我们尝试 for...of 对其进行操作时，会报错：TypeError: obj[Symbol.iterator] is not a function。

## 但带 length 的除外：
```js
const obj = { length: 3, 0: 'foo', 1: 'bar', 2: 'baz' };
 
const array = Array.from(obj);
for (const value of array) { 
    console.log(value);
}
```


## For…of vs For…in
> for...in 循环将遍历对象的所有可枚举属性。
```js
//for-in-example.js
Array.prototype.newArr = () => {};
Array.prototype.anotherNewArr = () => {};
const array = ['foo', 'bar', 'baz'];

for (const value in array) { 
  console.log(value);
}
// Outcome:
// 0
// 1
// 2
// newArr
// anotherNewArr
```
## 不仅枚举上面的数组声明
for...in 不仅枚举上面的数组声明，它还从构造函数的原型中查找继承的非枚举属性，在这个例子中，newArr 和 anotherNewArr 也会打印出来。




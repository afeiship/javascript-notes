# reflect:
- https://github.com/tvcutsem/harmony-reflect/wiki#reflect

## 简单总结几点：
1. More useful return values
```js
// 原来的：
try {
  Object.defineProperty(obj, name, desc);
  // property defined successfully
} catch (e) {
  // possible failure (and might accidentally catch the wrong exception)
}

// 现在： To this:

if (Reflect.defineProperty(obj, name, desc)) {
  // success
} else {
  // failure
}
```

2. 统一操作接口
3. 更加的 OOP
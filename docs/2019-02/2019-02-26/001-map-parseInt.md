# map-parseInt:
- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4
- https://www.cnblogs.com/54td/p/10429549.html

## 题目：
```js
['1', '2', '3'].map(parseInt)
```

## 解答：
```js
// 对于每个迭代`map`, `parseInt()`传递两个参数: **字符串和基数**。
// 所以实际执行的的代码是：

['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
});
```
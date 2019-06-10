# toString


## toString([radix])
- toString() 方法可把一个 Number 对象转换为一个字符串，并返回结果。

~~~
参数	描述
radix	可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。
~~~

```js
> (35).toString(36)
'z'

> (36).toString(36)
'10'
```
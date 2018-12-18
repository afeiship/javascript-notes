# indexOf

```js
var array = ['a','b','c','d','e'];

var rs1 = array.indexOf('f') //-1, because it doesn't exist in array
var rs2 = array.indexOf('a') //0
var rs3 = array.indexOf('c') //2

// -1 0 2
console.log(rs1,rs2,rs3) 

// 这丙个 [0 -1 -3]；-1 会返回0， 非-1 会返回非0
console.log(~rs1, ~rs2, ~rs3)

// 这个会返回一个很大的数
// -1>>>0  -> 4294967295
// rs2/rs3 会返回正常的值
// 下面这个用在 array的 splice 操作，可以不用判断 -1的情况了
console.log(rs1 >>> 0, rs2 >>> 0, rs3 >>> 0)
```


## 看看 index -1 >>> 0 的实际运用场景：
```js
off(type: string, handler: EventHandler) {
    if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
    }
},
```
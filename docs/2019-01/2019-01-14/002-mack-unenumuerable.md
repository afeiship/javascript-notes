# enumerable
> Make some member unenumerable.

## Make unenumerable
```js
var obj = {
    base:function(){
        console.log('base method')
    }
};

Object.defineProperty(obj, 'parent', {
    enumerable: false,
    value: function(){
        console.log('parente method;');
    }
});

console.log( Object.keys(obj) )
// ['base']
```
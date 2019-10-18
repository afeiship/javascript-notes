# getComputedStyle

## 基本用法
```js
window.getComputedStyle(document.querySelector('#one'), ':before');;
```

## 兼容性
关于 getComputedStyle 的兼容性问题，在 Chrome 和 Firefox 是支持该属性的，同时 IE 9 10 11 也是支持相同的特性的，IE 8并不支持这个特性。 IE 8 支持的是 element.currentStyle 这个属性，这个属性返回的值和 getComputedStyle 的返回基本一致，只是在 float 的支持上，IE 8 支持的是 styleFloat,这点需要注意

## resources
- https://stackoverflow.com/questions/29016767/getcomputedstyle-from-the-before-pseudo-element
- https://www.runoob.com/w3cnote/window-getcomputedstyle-method.html
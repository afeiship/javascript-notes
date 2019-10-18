# event delegate
- 事件代理

## 含义
- 事件委托是将事件监听器添加到父元素，而不是每个子元素单独设置事件监听器。
- 当触发子元素时，事件会冒泡到父元素，监听器就会触发。这种技术的好处是：

## 好处
内存占用减少，因为只需要一个父元素的事件处理程序，而不必为每个后代都添加事件处理程序。
无需从已删除的元素中解绑处理程序，也无需将处理程序绑定到新元素上。

## 个人理解
- scroll 事件需要做一些特别处理，因为这个元素通常是在 parent 上触发
- 对于 focus/blur/input 等元素，需要用 capture 来代替，因为这些元素默认是不冒泡的
- CSS的一个属性：pointer-events 可以解决事件代理中的一些常见问题

## 防止内部元素触发事件的方法
### 结构部分
```html
<button id="btn1">
    <i class="ion ion-ios-analytics"></i>
    <span>a button</span>
</button>
```

### 样式部分
```css
#btn1 i,
#btn1 span {
    /* 这样可以确保点击的只是 button，i/span 等内部元素永远不会被触发 */
    pointer-events: none;
}
```

## 如果是 用纯 js 的方式，就用 el.contains
- 这个方法最早产生于 ie
- 现在标准浏览器都已经实现，并且兼容性很好
- 这个方法有一个参数 true/false，是否包含本身
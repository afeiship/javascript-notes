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

## 常见面试题
- 一个列表，有大量的 子项目(item)
- 父级绑定事件，这个就是事件代理的应用，
- 不用卸载事件，只要在父级绑定一次即可
- 如果需要取得当前元素，在初始化的时候，加一个 data-index/data-id 类似的选项就行了
- 有 id 会比 index 好一些，因为 id 唯一，且一般不用前端生成。
- index 在做一些排序的场景，有可能会自动重新计划，导致这一些场景无法按正确的逻辑走

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

## 还可以使用 matches api 元素是否匹配这个选择器
```js
function determineIfElementMatches(element, selector) {
	return element.matches(selector);
}
```
## 有 class 的场景
- 可以直接使用 classList 的 contains
- 兼容性的场景可以使用 className 的 string 判断，记得两边加' ' + inClassName + ' ' 来构造正则，或者字符串，避免一些常见的 BUG

## resources
- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation
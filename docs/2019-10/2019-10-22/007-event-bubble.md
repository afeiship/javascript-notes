# event bubble
- 请描述事件冒泡。


## 事件 focus/blur
- focusin/focusout/focus/blur事件的区别与不同

## 事件 mouseenter/leave
- 区别在于，在一个有多层 div 的容器里，会重复触发。enterleave 则只会在外层触发一次。
- 可以用 contains 来模拟 enterleave（早期只有 ie 支持，标准浏览器需要用这种方式来模拟）

## 顺序
- 对于同时支持这4个事件的浏览器，事件执行顺序为focusin（聚焦） > focus > focusout（失焦） > blur
- 同时也可以看到 focus/blur是不支持冒泡的，所以.parent 元素绑定的focus和blur事件回调并没有触发。
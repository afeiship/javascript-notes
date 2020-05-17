# custom event
- https://www.cnblogs.com/developer-ios/p/11662939.html


## CustomEvent
CustomEvent 可以创建一个更高度自定义事件，还可以附带一些数据，具体用法如下：

var myEvent = new CustomEvent(eventname, options);
其中 options 可以是：
{
  detail: {
    ...
  },
  bubbles: true,    //是否冒泡
  cancelable: false //是否取消默认事件
}
其中 detail 可以存放一些初始化的信息，可以在触发的时候调用。其他属性就是定义该事件是否具有冒泡等等功能。

内置的事件会由浏览器根据某些操作进行触发，自定义的事件就需要人工触发。


## dispatchEvent 函数就是用来触发某个事件：

element.dispatchEvent(customEvent);
上面代码表示，在 element 上面触发 customEvent 这个事件。
结合起来用就是：

// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });
 
// create and dispatch the event
var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}});
obj.dispatchEvent(event);
使用自定义事件需要注意兼容性问题


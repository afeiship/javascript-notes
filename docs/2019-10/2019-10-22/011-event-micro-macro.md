# event_loop [micro/macro]
- Event Loop 中的 microtask 与 macrotask


## event loop
事件循环是用来做异步任务处理的, 与之相同的做异步任务处理的还有多线程, 但是由于 javascript 的单线程特性, 最终使用 event loop 的方式.
或许你可以从下面的简略的伪代码看出 event loop 是什么:
```js
eventQueue = [];
event;
while(1){
    if(eventQueue.length > 0) {
        event = eventQueue.shift();

        try {
            event();
        } catch(err) {
            reportError(err);
        }
    }
}
```
event loop 有两种, 一种是在浏览器上下文, 一种是在 worker 上下文的.浏览器上下文一般会至少有一个 event loop, 像一个 iframe, 浏览器窗口
都会有一个 event loop, 而对于 worker 上下文的则比较简单, worker 进程管理着一个 event loop.这里着重将浏览器上下文的 event loop.

Task queues are sets, `not queues`, because step one of the event loop processing model grabs the first runnable task from the chosen queue, instead of dequeuing the first task.

The microtask queue is not a task queue.

## event_loop 运行流程
根据规范 event loop 所讲的, 它的流程如下:
当一个 event loop 存在, 它会按照以下的步骤运行:
1. 在最老的任务队列中取出最老的任务, 如果没有任务(MainTask),
2. 那么就会跳到 microtask 队列的执行. 
3. 将 event loop 当前任务设置为最老的那个任务.
4. 执行当前任务队列中最老的那个任务
5. 将 event loop 当前运行任务设置为 null
6. 将刚刚执行的那个最老的任务从它的队列中移除
7. 执行检查 microtask 队列算法(`microtask checkpoint` 这个稍后详谈), 这里先粗略理解为执行 microtask 队列
8. 更新渲染(update the rendering)
9. 如果是一个 worker event loop, 但是没有任务, 并且 WorkerGlobalScope 对象的 closing flag 值为 true 的, 就销毁 event loop 并中止这些步骤,
并进行 web worker 中的 run worker 算法.
9. 返回到第一步, 此为一个事件循环.

### microtask checkpoint <这段完全不明所以>
每一个 event loop 都有一个 microtask 的队列.我们从规范看到 event loop, microtask 队列的流程如下:

如果用户代理的 checkout point flag 值为 false 的时候, 就会按照下面的步骤进行执行:
1. 设置 performing a microtask checkpoint flag 值为 true.
2. 当 microtask 队列不为空时:
    2.1 选择队列中最老的任务队列
    2.2 设置当前运行任务为选择的最老任务
    2.3 执行这个最老的任务
    2.4 设置当前运行任务为 null
    2.5 将刚刚运行的任务从它的任务队列中移除.
    2.6 回到 2
3. 每一个 environment settings object 他们的 responsible event loop 就是当前 event loop, 会给 environment settings object 发出一个 rejected promise 的通知.
4. 清理 indexed db 事务
5. 将 performing a microtask checkpoint flag 设置为 false

### microtask 与 macrotask 的区别
这个应该是 event loop 中比较核心的问题, 究竟 timer 一类设定的 macrotask 与 promise 一类设定的 microtask 有什么区别?
从上面对规范的解读可以看出, microtask 与 macrotask 在执行上有区别, 

- 一次 event loop 会取一个 macrotask 执行, 但是会将一个 microtask 队列清空
- 如果一个 microtask 队列过长, 确实会阻塞下一个 macrotask 的开始执行时间.

可以看出, 在异步中, js 虽然是异步非阻塞, 但是却是使用
同步的方式来执行 microtask 的.

### task vs job
另外从字面上来说, macrotask 属于 task, 也就是大型任务
microtask 属于 job, 也就是小型任务, 而对于如何更详细的区分, 规范并没有说,

### 而是从产生类型,上将两类分开:
macroTask: setTimeout, setInterval, setImmediate, I/O, rendering
microTask: promise, process.nextTick, Object.observe, MutationObserver


## resources
https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
https://juejin.im/entry/5a7864d4f265da4e914b3dc7
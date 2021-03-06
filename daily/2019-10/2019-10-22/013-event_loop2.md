# event_loop2

## 场景再现

我们继续回到单线程的问题上来,既然是单线程,这就意味着所有任务都需要在这个线程上排队,只有前一个任务结束才会执行下一个任务,如果前一个任务耗时比较长,


例如网络请求,再加上还在2G时代的话,又或者是 I/O 操作的话,那岂不是要一直等到当前任务执行完毕才可以执行下一个任务了吗?
假如排队的原因是因为任务的业务逻辑过于复杂/数据处理的数据较为庞大,导致 CPU 忙不过来倒是可以谅解,关键是很多时候 CPU 是空闲的,
因为 IO设备很慢,不得不等待起结束后才可以执行下一个任务,设计者在设计之初也意识到这个问题,
认为这种情况下完全可以不管IO设备,先把它挂起
运行后面的任务.等其返回了结果,再把挂起的任务继续执行下去.


## 同步任务、异步任务
于是在 JS 的单线程上存在这两种任务,分别是 
- 同步任务(Synchronous)
- 异步任务 (Asynchronous)

同步任务: 在主线程上排队执行的任务,只有前一个任务执行完毕才会执行下一个任务
异步任务: 不加入主线程,而是进入任务队列(task queue)的任务,只有任务队列告知主线程当前队列的某个任务可以执行了,该任务才会进入主线程执行



## What is event loop
Event Loop即事件循环，是指浏览器或Node的一种解决 `javaScript` 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

## heap
堆是一种数据结构，是利用完全二叉树维护的一组数据，堆分为两种，一种为最大堆，一种为最小堆，将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。
堆是线性数据结构，相当于一维数组，有唯一后继。

## 栈（Stack）
栈在计算机科学中是限定仅在表尾进行插入或删除操作的线性表。 栈是一种数据结构，它按照后进先出的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据。
栈是只能在某一端插入和删除的特殊线性表。

<img width="500" src="https://user-gold-cdn.xitu.io/2019/1/17/16859ed4f6143043?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" />

## 队列（Queue）
特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。
进行插入操作的端称为队尾，进行删除操作的端称为队头。  队列中没有元素时，称为空队列。
队列的数据元素又称为队列元素。在队列中插入一个队列元素称为入队，从队列中删除一个队列元素称为出队。因为队列只允许在一端插入，在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除，故队列又称为先进先出（FIFO—first in first out）

<img width="500" src="https://user-gold-cdn.xitu.io/2019/1/17/16859f2f4f5da2a8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" />

## Micro/Macro task
在JavaScript中，任务被分为两种，
- 一种宏任务（MacroTask）也叫Task (Task)
- 一种叫微任务（MicroTask）。(Job)


## MacroTask（宏任务）
script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering。

## MicroTask（微任务）
Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver（具体使用方式查看这里）

## main thread/call-stack
Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

## JS调用栈
JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。



## resources
- https://juejin.im/post/5c3d8956e51d4511dc72c200
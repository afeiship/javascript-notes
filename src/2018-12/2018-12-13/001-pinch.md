# pinch:
+ https://www.zhihu.com/question/52920953/answer/146328736


那么，如何在小程序中实现手势缩放呢？这个过程涉及两个步骤：手势动态检测；图片动态缩放。手势动态检测首先，我们需要获得用户的触摸事件。只有获得了这个事件，小程序才能得知用户希望缩放图片，同时确定图片的缩放倍数。我们需要的，就是微信提供的 touchmove 事件。在用户触摸屏幕并在屏幕上移动手指时，这个事件就会被触发。手势缩放的核心思想是：根据两只手指相对距离的变化来对图片进行放大或缩小。因此，我们需要知道两只手指相对距离的变化，才能做到良好的缩放体验。touchmove 事件可以实现的功能，大致可以总结为：手指在屏幕上进行移动时，对应的组件上就会以 16 ms 一次的频率不断触发 touchmove 事件；手指离开屏幕后，则会触发 touchend 事件。touchmove 事件所包含的事件对象中有一个 touches 属性，此属性为当前停留在屏幕中的触摸点信息的数组。
触摸点的信息包括：identifier：触摸点的标志符；pageX 和 pageY：距离文档左上角的距离；
clientX 和 clientY：距离屏幕可显示区域左上角距离。我们可以通过不断获取 clientX 和 clientY 数据的方式，来确定手指在屏幕上的位置变化。
```js
var xMove = e.touches[1].clientX - e.touches[0].clientX;
var yMove = e.touches[1].clientY - e.touches[0].clientY;
var distance = Math.sqrt(xMove * xMove + yMove * yMove);
```
distance 变量即为两只手指之间的距离。

在 touchmove 被触发的时候，小程序就会计算一次 distance。我们为新的 distance 变量定名为 newDistance，相应地，旧变量定名为 oldDistance。之后，我们设定一个新的变量 distanceDiff = newDistance - oldDistance，它反映两次 touchmove 触发瞬间，两根手指相对距离的变化值。distanceDiff 为正数时，表示两指间距离在变大，图片需要被放大；反之，则代表两指间距缩小，图片需要被缩小。图片动态缩放到这里，我们已经可以探测用户的手指距离变化了。接下来，我们需要根据用户的手势，确定图片缩放倍数，然后根据倍数缩放图片。首先，要确定 distance 的变化值与图片放大或缩小的变化率相关联的规则。我们将图片正常显示时的尺寸定为基准值，存放于变量 baseWidth 和 baseHeight 中。图片需要放大的倍数设置为变量 scale，它的初始值和最小值为 1，最大值可根据需要来设置。
经过多次试验，我们最后确定了一个公式：
```js
newScale = oldScale + 0.005 * distanceDiff
```
此公式中的 0.005 为图片的缩放比例。在实测中，使用 0.005 这个值可获得比较良好的缩放体验。现在，我们为图片对象绑定 touchmove 事件。在每次 touchmove 被触发后，我们都可以计算出新的图片需要被放大的倍数，我们将这个变量定名为 scale。
具体方式是：在每次 touchmove 被触发后，通过探测手指距离变化而得到的数据，来得到图片按比例缩放后的高宽值。
```js
scaleWidth = scale * baseWidth;
scaleHeight = scale * baseHeight;
```
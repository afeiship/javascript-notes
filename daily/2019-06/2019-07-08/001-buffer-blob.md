# buffer/blob
- https://www.cnblogs.com/youhong/p/10875190.html

## blob
概念理解
Blob的全称是binary large object，表示二进制大对象，并不是前端的特有对象，而是计算机界的通用术语，MySql/Oracle数据库中，就有一种Blob类型，专门存放二进制数据。
MDN中官方的解释是：一个Blob对象就是一个包含有只读原始数据的类文件对象。通俗点，我们可以直接将Blob看做是一个不可修改的二进制文件。

## ArrayBuffer
ArrayBuffer的概念和用法相对比较复杂（它本身不复杂，只是使用方式比较丰富），之后会在另外一篇博客作出解释，这里仅做简要说明，主要是理解它的宏观概念。

ArrayBuffer就是一个二进制数据通用的固定长度容器。通俗点说，就是内存上一段连续的二进制数据。
我们可以对ArrayBuffer进行读写，但需要借助它提供的工具TypeArray或DataView
blob与ArrayBuffer的关系

相同点： Blob和ArrayBuffer都是二进制的容器；
ArrayBuffer：ArrayBuffer更底层，就是一段纯粹的内存上的二进制数据，我们可以对其任何一个字节进行单独的修改，也可以根据我们的需要以我们指定的形式读取指定范围的数据
Blob：Blob就是将一段二进制数据做了一个封装，我们拿到的就是一个整体，可以看到它的整体属性大小、类型；可以对其分割，但不能了解到它的细节
联系：Blob可以接受一个ArrayBuffer作为参数生成一个Blob对象，此行为就相当于对ArrayBuffer数据做一个封装，之后就是以整体的形式展现了
应用上的区别：由于ArrayBuffer和Blob的特性，Blo作为一个整体文件，适合用于传输；而只有需要关注细节（比如要修改某一段数据时），才需要用到ArrayBuffer

## File
概念理解
file根据名字很容易理解，就是纯粹的文件。通常，表示我们使用<input type="file">选择的FileList对象，或者是使用拖拽操作搞出的DataTransfer对象。
file对象也是二进制对象，从属于Blob；也就是说file是Blob里的一个小类，Blob的属性和方法都可以用于file，而file自己也有自己特有的属性和方法。对于Blob和file都有的属性，推荐使用Blob的属性
使用
这里就不做过多介绍了，可以直接参考MDN上的介绍

## fileReader
前面提到Blob对象时一个只读对象，但它是一个二进制对象，如果直接读取就只能拿到一堆01数据，因此需要借助专门的工具来读取，这个工具就是fileReader。
通过fileReader可以将Blob读取为不同的格式，具体将在另一篇博文中讲到。

Q：前面提到，ArrayBuffer也需要借助工具（以dataView为例）读取数据，那和fileReader有什么区别呢？
A：我理解的，ArrayBuffer的工具dataView只是简单的读取数据，最多就是讲数据转为数字或字符串；但fileReader可以看做是多了一道编码的过程，通过FileReader.readAsDataURL(blob)就是将二进制数据读取并编码为Base64格式，FileReader.readAsText(blob)就是将二进制数据读取并编码为字符串形式。

## fromData
准确来说，FormData其实与上述内容关系就不大了。它是XMLHttpRequest Level 2添加的一个新的接口，我们可以通过JavaScript用一些键值对来模拟一系列表单控件。FormData的最大优点就是，比起普通的ajax, 使用FormData我们可以异步上传一个二进制文件，而这个二进制文件，就是我们上面讲的Blob对象。
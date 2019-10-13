# angular scope

```js
import { isEqual } from 'lodash'
 
class Scope {
 constructor() {
  this.$$dirty = true
  this.$$count = 0
  this.$$watchers = []
 }
 $watch(property, listener, deepEqual) {
  let watcher = {
   property,
   listener,
   deepEqual,
  }
  this.$$watchers.push(watcher)
 }
 $digest() {
  if (this.$$count >= 10) {
   throw new Error('$digest超过10次')
  }
 
  this.$$watchers.forEach(watcher => {
   let newValue = eval('return this.' + watcher.property)
   let oldValue = watcher.oldValue
   // isEqual 可能会是一个深对比
   if (watcher.deepEqual && isEqual(newValue, oldValue)) {
    watcher.dirty = false
   } 
   else if (newValue === oldValue) {
    watcher.dirty = false
   }
   else {
    watcher.dirty = true
    eval('this.' + watcher.property + ' = ' newValue)
    watcher.listener(newValue, oldValue) // 注意，listener是在newValue赋值给$scope之后执行的
    watcher.oldValue = newValue
   }
   // 这里的实现和angular逻辑里面有一点不同，angular里面，当newValue和oldValue都为undefined时，listener会被调用，可能是angular里面在$watch的时候，会自动给$scope加上原本没有的属性，因此认为是一次变动
  })
   
  this.$$count ++
 
  this.$$dirty = false
  for (let watcher of this.$$watchers) {
   if (watcher.dirty) {
    this.$$dirty = true
    break
   }
  }
 
  if (this.$$dirty) {
   this.$digest()
  }
  else {
    this.$patch()
    this.$$dirty = true
    this.$$count = 0
  }
 }
 $apply() {
  if (this.$$count) {
   return // 当$digest执行的过程中，不能触发$apply
  }
  this.$$dirty = true
  this.$$count = 0
  this.$digest()
 }
 $patch() {
  // 重绘界面
 }
}
```
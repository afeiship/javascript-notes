# dirty-check

## 简化版的Dirty-Checking:

```html
<input type="text" />

<a href="#" onclick="updateScopeValue();">Set input value to Bob</a>
```

```js
var Scope = function( ) {
    this.$$watchers = [];    
};

Scope.prototype.$watch = function( watchExp, listener ) {
    // 1. watch 的元素，会进入 watches 列表中，存好，这个是注册过程
    this.$$watchers.push( {
        watchExp: watchExp,
        listener: listener || function() {}
    } );
};

Scope.prototype.$digest = function( ) {
    // 2. 这个方法是，真正变化 的时候需要调用，做检测用的
    // 基本原理是 oldValue / newValue 做对比，这里如果是对象就需要进行深层对比
    // 并且把这个 key 置为 tre
    // 同时，把新值传给外面，以达到值更新的目的(或者这里，是发 notify 出去，给内部更新数据的方法)
    var dirty;

    do {
            dirty = false;

            for( var i = 0; i < this.$$watchers.length; i++ ) {
                var newValue = this.$$watchers[i].watchExp(),
                    oldValue = this.$$watchers[i].last;

                if( oldValue !== newValue ) {
                    this.$$watchers[i].listener(newValue, oldValue);

                    dirty = true;

                    this.$$watchers[i].last = newValue;
                }
            }
    } while(dirty);
};


var $scope = new Scope();

$scope.name = 'Ryan';

var element = document.querySelectorAll('input');

element[0].onkeyup = function() {
    $scope.name = element[0].value;

    $scope.$digest();
};

$scope.$watch(function(){
    return $scope.name;
}, function( newValue, oldValue ) {
    console.log('Input value updated - it is now ' + newValue);
    
    element[0].value = $scope.name;
} );

var updateScopeValue = function updateScopeValue( ) {
    $scope.name = 'Bob';
    $scope.$digest();
};
```


## resources
- https://www.cnblogs.com/linda586586/p/4645845.html
- https://ryanclark.me/how-angularjs-implements-dirty-checking/
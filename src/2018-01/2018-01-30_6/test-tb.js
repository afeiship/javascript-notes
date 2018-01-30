/**
    throttle 思路：
    1. 时间间隔： 300ms
    2. 当前时间是0，如果最新过了200ms
    3. 200ms - 0 > 300ms 不成立，所以，啥也不干
    4. 如果时间到了 350ms 这样就会大于 300ms; 执行一次； 同步last = 350ms;
    5. 时间到了790ms, 790ms - 350ms > 300ms 继续触发
 */
function throttle(inCallback, inInterval){
    var last = 0;
    var current;
    return function(){
        current = Date.now();
        if( current - last > inInterval){
            last = current;
            inCallback.apply(this, arguments);
        }
    };
}


function debounce(inCallback, inInterval){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            inCallback.apply(this, args);
        },inInterval);
    };
}



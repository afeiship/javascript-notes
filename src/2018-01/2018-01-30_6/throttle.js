// 这个简单的版本，就可以work了
function throttle1(inCallback, inInterval) {
    var interval = inInterval || 1000;
    var last = 0;
    return function () {
        var curr = +new Date();
        var args = arguments;
        if (curr - last > interval) {
            last = curr;
            inCallback.apply(this, args);
        }
    };
}


// 这个是考虑到用户在这个过程中改时间的情况：
function throttle(inCallback, inInterval) {
    var interval = inInterval || 100;
    var last = 0;
    var timer = null;
    return function () {
        var curr = +new Date();
        var args = arguments;

        if (curr - last > interval) {
            last = curr;
            inCallback.apply(this, args);
        } else {
            //至少会执行一次
            // 这个在最后那个还会执行一次
            // 比如 interval 时间 为300ms, curr - last = 200; 达不到执行的条件，但下面这个timer会在内存里，最终会被执行一次
            clearTimeout(timer);
            timer = setTimeout(function(){
                last = curr;
                inCallback.apply(this, args);
            },interval);
        }
    };
}
function createXHR(){
    return typeof window.XMLHttpRequest === 'undefined' ? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP');
}

// application/x-www-form-urlencoded;
// application/json; charset=utf-8;
// application/form-data;

// async: true 同步， false: 异步
function Ajax(method, url, async, callBacks, data) {
    var xhr = createXHR();
    if (method == 'get') {
        xhr.open('get', url, async);
        xhr.send();
    } else if (method == 'post') {
        xhr.open('post', url, async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callBacks(xhr.responseText);
            } else {
                console.error('出错了,Error' + xhr.status);
            }
        }
    };
}
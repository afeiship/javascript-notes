(function () {

    function createXHR() {
        return window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 利用懒执行：
    var createXHR_optimze = (function () {
        if (window.XMLHttpRequest) {
            return function () {
                return new XMLHttpRequest()
            };
        } else {
            return function () {
                return new ActiveXObject('Microsoft.XMLHTTP')
            }
        }
    }());

    // 更加优化的方案,执行一次之后，才会有这个真正的create_XHR产生
    var createXHR_optimze2 = function () {
        if (window.XMLHttpRequest) {
            createXHR_optimze2 = function () {
                return new XMLHttpRequest()
            };
        } else {
            createXHR_optimze2 = function () {
                return new ActiveXObject('Microsoft.XMLHTTP')
            }
        }
        createXHR_optimze2();
    };

    function ajaxPOST(inUrl, inConfig, inCallback) {
        var xhr = createXHR();
        var data = inConfig.data || {};
        var headers = inConfig.headers || {};

        xhr.open('POST', inUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                inCallback(xhr.responseText);
                xhr = null;
            }
        };
        xhr.send(null);
    }

}())
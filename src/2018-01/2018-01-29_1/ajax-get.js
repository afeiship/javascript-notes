(function () {
    // code goes here!

    /** ======================= helpler start =======================  */
    // {a:1,b:2}
    function param(inData) {
        var result = [];
        for (var key in inData) {
            if (inData.hasOwnProperty(key)) {
                var value = inData[key];
                result.push(key + '=' + value);
            }
        }
        return result.join('&');
    }

    function setHeaders(inXhr, inData) {
        for (var key in inData) {
            if (inData.hasOwnProperty(key)) {
                var value = inData[key];
                inXhr.setHeader(key, value);
            }
        }
    }
    /** ======================= helpler end =======================  */

    function createXHR() {
        return window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
    }

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
        return createXHR_optimze2();
    };

    function ajaxGET(inUrl, inConfig, inCallback) {
        var xhr = createXHR_optimze2();
        var data = inConfig.data || {};
        var headers = inConfig.headers || {};
        var url = inUrl + '?' + param(data);

        xhr.open('GET', url, true);
        setHeaders(xhr, headers);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                inCallback(xhr.responseText);
                xhr = null;
            }
        };
        xhr.send(null);
    }

    window.ajaxGET = ajaxGET;

}());
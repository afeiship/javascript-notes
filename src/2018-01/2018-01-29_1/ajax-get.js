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


    function ajaxGET(inUrl, inConfig, inCallback) {
        var xhr = createXHR();
        var data = inConfig.data || {};
        var headers = inConfig.headers || {};
        var url = inUrl + '?' + param(data);

        xhr.open('GET', url, false);
        setHeaders(xhr, headers);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                inCallback(xhr.responseText, xhr);
                xhr = null;
            }
        };
        xhr.send(null);
    }

    window.ajaxGET = ajaxGET;



}());
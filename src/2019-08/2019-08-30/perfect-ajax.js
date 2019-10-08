// https://stackoverflow.com/questions/32497035/abort-ajax-request-in-a-promise



// Promise cancellation is currently under specification, there is no built in way to do this yet (it's coming though). We can implement it ourselves:

var validateAjax = function(value) {
    // remove explicit construction: http://stackoverflow.com/questions/23803743
    var xhr = $.ajax('data.json', {data: {value: value}}); 
    var promise = Promise.resolve(xhr).then(function(data){
         if(!data.isValid) throw new Error(data.message); // throw errors
         return data;
    });
    promise.abort = function(){
       xhr.abort();
    };
    return promise;
}
// Now, we can kill the validateAjax calls by calling abort on the promise:

var p = validateAjax("..."); // make request
p.abort(); // abort it;
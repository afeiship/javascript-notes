# watch:
- https://abdulapopoola.com/2015/04/17/how-to-watch-variables-in-javascript/
- https://bl.ocks.org/goliatone/2863539
- https://davidwalsh.name/watch-object-changes
- http://zencode.in/4.watch-js%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB.html
- https://gist.github.com/eligrey/384583
- https://medium.com/@jbmilgrom/watch-watchgroup-watchcollection-and-deep-watching-in-angularjs-6390f23508fe

## object-path:
- https://github.com/mariocasciaro/object-path

## proxify
- https://stackoverflow.com/questions/42747189/how-to-watch-complex-objects-and-their-changes-in-javascript
- https://codeday.me/bug/20180903/238091.html

## simple implement:
```js
if (!Object.prototype.watch) {
 Object.defineProperty(
   Object.prototype,
   "watch", {
     enumerable: false,
     configurable: true,
     writable: false,
     value: function (prop, handler) {
       var old = this[prop];
       var cur = old;
       var getter = function () {
          return cur;
       };
       var setter = function (val) {
        old = cur;
        cur =
          handler.call(this,prop,old,val);
        return cur;
       };
 
       // can't watch constants
       if (delete this[prop]) {
        Object.defineProperty(this,prop,{
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
       }
    }
 });
}
```
# classic interview

```js
async function async1 () {
  //3.
  console.log('async1 start');
  //4.
  await async2();
  console.log('async1 end');
}

async function async2 () {
  //5.
  console.log('async2');
}

// 1.
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

//2.
async1();

new Promise(function (resolve) {
  //6.
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

// 7.
console.log('script end');


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

```

## 知识点
```js
//1. 这种暂时当成 `function async2(){}`
async function async2 () {
  console.log('async2');
}


//2.
async function async1 () {
  //3.
  console.log('async1 start');
  //4.
  await async2();
  console.log('async1 end');
}
// 转化为
function async1(){
    console.log('async1 start');
    return new Promise(()=>{
        async2()
        resolve();
    }).then(res=>{
        console.log('async1 end');
    })
}
```



## resources
https://segmentfault.com/a/1190000017480929
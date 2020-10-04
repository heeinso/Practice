## Scheduler

### 자바스크립트 엔진

자바스크립트 엔진은 하나의 스레드에서 동작하므로 하나의 코드 조각을 하나씩 실행한다.
(동시에 단 하나의 작업만 수행 가능)

### 이벤트 루프와 큐

자바스크립트는 이벤트 루프와 큐를 이용하여 비동기 작업을 수행
직접적인 작업은 Web API에서 처리되고, 그 작업들이 완료되면 요청 시 등록했던 콜백이 큐에 등록됨
이벤트 루프는 계속 반복해서 콜 스택과 큐 사이의 작업들을 확인하고 콜 스택이 비어 있는 경우 큐에서 작업을 꺼내어 콜 스택에 넣음

### 예제 코드

```javascript
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

requestAnimationFrame(function () {
  console.log("requestAnimationFrame");
});

console.log("script end");

// script start
// script end
// promise1
// promise2
// requestAnimationFrame
// setTimeout
```

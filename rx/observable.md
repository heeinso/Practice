## Observable 구현 시 고려 사항

### 에러 발생

```javascript
const { Observable } = rxjs;
const number$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    // 에러 발생 시
    throw new Error("데이터 전달 도중 에러가 발생했습니다");
    observer.next(3);
  } catch (e) {
    observer.error(e);
  }
});

number$.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
});

// 1
// 2
// 데이터 전달 도중 에러가 발생했습니다
```

### 데이터 전달 완료

```javascript
const { Observable } = rxjs;
const number$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (e) {
    observer.error(e);
  }
});

number$.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
  complete: () => console.log("데이터 전달 완료"),
});

// 1
// 2
// 3
// 데이터 전달 완료
```

> Observer.complete가 호출되면 Observer와의 구독을 자동으로 해지한다.

### 구독 해제

- HTML element에 이벤트 핸들러를 붙여서 데이터를 계속 전송 받는 경우
- interval을 통해 데이터를 계속 전달 받는 경우

자원을 해제해줘야 함

```javascript
const { Observable } = rxjs;
const interval$ = new Observable(function subscribe(observer) {
  const id = setInterval(function () {
    observer.next(new Date().toString());
  }, 1000);
  // 자원을 해제하는 함수
  return function () {
    console.log("interval 제거");
    clearInterval(id);
  };
});

const subscription = interval$.subscribe((v) => console.log(v));

// 5초 후 구독을 해제한다.
setTimeout(function () {
  subscription.unsubscribe();
}, 5000);
```

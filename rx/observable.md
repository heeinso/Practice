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
  let i = 1;
  const id = setInterval(function () {
    observer.next(i);
    i++;
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

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// interval 제거
```

## 자동 완성 UI 만들기

> **디바운스와 쓰로틀**
> 디바운스는 요청이 반복되는 시간에는 요청을 방지하고 요청이 멈추었을 때 마지막 요청을 설정한 시간이 지난 이후에 요청하는 프로그래밍 기술이다.
> 쓰로틀은 많은 요청이 오더라도 설정한 시간 내에 딱 한 번 호출되도록 만드는 프로그래밍 기술이다.

```javascript
const { fromEvent } = rxjs;
const {
  map,
  mergeMap,
  debounceTime,
  filter,
  distinctUntilChanged,
} = rxjs.operators;
const { ajax } = rxjs.ajax;

const user$ = fromEvent(document.getElementById("search"), "keyup").pipe(
  debounceTime(300), // 300ms 뒤에 데이터를 전달한다.
  map((event) => event.target.value),
  distinctUntilChanged(), // 특수키가 입력된 경우에는 나오지 않기 위해 중복 데이터 처리
  filter((query) => query.trim().length > 0),
  mergeMap((query) =>
    ajax.getJSON(`https://api.github.com/search/users?q=${query}`)
  )
);
```

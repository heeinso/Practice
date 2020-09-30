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

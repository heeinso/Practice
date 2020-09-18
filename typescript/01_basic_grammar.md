## 기본 타입

### boolean

> 참 / 거짓

### number

> IEEE754 표준을 따르는 부동소수점

### string

> 문자열

### null / undefined

> null 타입과 undefined 타입은 각각 null과 undefined라는 하나의 값만을 갖는다

### any

> 모든 값의 타입을 any 로 지정할 수 있고, any 타입의 변수에는 모든 값을 할당할 수 있다

### void

> null과 undefined 만을 값으로 가질 수 있는 타입이다. 아무런 값도 반환하지 않는 함수의 반환 타입을 표시할 때 사용

### never

> 아무런 값도 가질 수 없는 타입

## 배열과 튜플

### 배열

```typescript
const pibonacci: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: string[] = [
  "Imperial Stout",
  "India Pale Ale",
  "Weizenbock",
];

// OR

const pibonacci: Array<number> = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: Array<string> = [
  "Imperial Stout",
  "India Pale Ale",
  "Weizenbock",
];
```

### 튜플

> 원소의 수와 각 원소의 타입이 정확히 지정된 배열의 타입을 정의 가능
> 만약 타입 정의보다 더 많은, 혹은 더 적은 원소를 갖는 배열을 할당한다면 에러 발생

```typescript
const invalidNameAndHeight: [string, number] = ["abc", 176, 42];
// error TS2322: Type '[string, number, boolean]' is not assignable to type '[string, number]'.
//   Types of property 'length' are incompatible.
//     Type '3' is not assignable to type '2'.
```

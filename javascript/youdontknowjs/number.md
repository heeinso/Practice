# 숫자

* 자바스크립트의 숫자 타입은 number가 유일
* 사실 진정한 정수가 없고, 정수를 부동 소수점 값이 없는 값 \(42.0 == 42\)

## 숫자 구문

* 아주 크거나 아주 작은 숫자는 지수형으로 표시하며 toExponential\(\) 메서드의 결과와 같다

```javascript
var a = 5E10;
a; // 50000000000
a.toExponential(); // 5e+10

var b = a * a;
b; // 2.5e+21

var c = 1 / a;
c; // 2e-11
```

## 작은 소수값

```javascript
0.1 + 0.2 === 0.3; // false
```

> 이를 해결하기 위해 미세한 '반올림 오차'를 허용 공차로 처리한다 이를 '머신 입실론'이라 하는데 자바스크립트에서는 Number.EPSILON = Math.pow\(2, -52\);로 정의됨

```javascript
function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1-n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b) // true
numbersCloseEnoughToEqual(0.0000001, 0.0000002); // false
```

## 특수 값

* 값 아닌 값
  * undefined: 값을 아직 가지지 않은 것 \(Empty\)
  * null: 예전에 값이 있었지만 지금은 없는 상태 \(Nonvalue\)
* undefined 
  * 느슨한 모드에서는 전역 스코프에서 undefined란 식별자에 값을 할당할 수 있다

```javascript
function foo() {
    undefined = 2;
}

foo();

function foo() {
    "use strict";
     undefined = 2; // 타입 에러 발생!
}

foo();
```

## 값 vs 레퍼런스

* 자바스크립트는 포인터라는 개념 자체가 없고 참조하는 방법도 조금 다름
* 자바스크립트에서 레퍼런스는 \(공유된\) 값을 가리키므로 서로 다른 10개의 레퍼런스가 있다면 이들은 저마다 항상 공유된 단일 값을 개별적으로 참조함
* 값의 타입만으로 값-복사 레퍼런스-복사 둘 중 한쪽이 결정됨

```javascript
var a = 2;
var b = a; // b는 언제나 a에서 값을 복사함

b++;
a; // 2
b; // 3

var c = [1, 2, 3];
var d = c; // d는 공유된 [1, 2, 3] 값의 레퍼런스
d.push(4);

c; // [1, 2, 3, 4]
d; // [1, 2, 3, 4]
```

> null, undefined, string, number, boolean, symbol 같은 단순 값\(스칼라 원시값\)은 언제나 값-복사 방식으로 할당/전달됨
>
> 객체나 함수 등 합성 값은 할당/전달 시 반드시 레퍼런스 사본을 생성함

```javascript
function foo(x) {
    x.push(4);
    x; // [1, 2, 3, 4]

    // 그 후
    x = [4, 5, 6];
    x.push(7);
    x; // [4, 5, 6, 7]
}

var a = [1, 2, 3];
foo(a);

a; // [1, 2, 3, 4]
```


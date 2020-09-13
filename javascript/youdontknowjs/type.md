# 타입

## 내장 타입

* null
* undefined
* boolean 
* number 
* string
* object 
* symbol \(ES6부터 추가\)

```javascript
typeof undefined === 'undefined' // true
typeof true === 'boolean' // true
typeof 42 === 'number' // true
typeof '42' === 'string' // true
typeof {life: 42} === 'object' // true
typeof Symbol() === 'symbol' // true

typeof null === 'object' // true
```

> 타입으로 null 값을 정확히 확인하려면 다음과 같이 하라

```javascript
var a = null;
(!a && typeof a === 'object'); // true
```

_null은 falsy한 유일한 원시값이지만 타입은 'object'인 특별한 존재다_

그 외에도 함수나 배열 등도 'object' 타입을 가지며 각각은 object의 하위타입으로서 호출 가능한 객체이다. 따라서 object와 같은 프로퍼티\(length 등\)를 가진다.

## 값이 없는 \(undefined\) vs 선언되지 않은 \(is not defined\)

```javascript
var a;
a; // undefined
b; // RefereneError: b is not defined

typeof a; // "undefined"
typeof b; // "undefined"
```

이는 typeof의 독특한 안전 가드 때문이다

```javascript
// 이렇게 하면 에러가 난다
if (DEBUG) {
    console.log('Start debugging');
}
// 이렇게 해야 안전하게 존재 여부를 체크 가능
if (typeof DEBUG !== "undefined") {
    console.log('Start debugging');
}
```

## 요약

1. 자바스크립트에는 7가지 내장 타입\(null, undefined, boolean, number, string, object, symbol\)이 있으며 typeof 연산자로 타입명을 알아낸다
2. 변수는 타입이 없지만 값은 타입이 있고 타입은 값의 내재된 특성을 정의한다
3. undefined은 선언된 변수에 할당할 수 있는 값이지만, undeclared는 변수 자체가 선언된 적이 없음을 나타낸다


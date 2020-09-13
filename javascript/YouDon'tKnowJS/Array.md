## 배열 

자바스크립트 배열은 강타입 언어들과 달리 문자열, 숫자 객체, 그리고 심지어는 다른 배열 등 어떤 타입의 값이라도 담을 수 있는 그릇이다

```javascript
var a = [1, "2", [3]];

a.length; // 3
a[0] === 1; // true
a[2][0] === 3; // true
```

배열 인덱스는 숫자인데, 배열 자체도 하나의 객체여서 키/프로퍼티 문자열을 추가할 수 있다는 점이 다소 까다롭다

```javascript
var a = [];

a[0] = 1;
a["foobar"] = 2;

a.length; // 1
a["foobar"]; // 2
a.foobar; // 2
```

**이상한 부분**
키로 넣은 문자열 값이 표준 10진수 숫자로 타입이 바뀌면, 마치 문자열 키가 아닌 숫자 키를 사용한 것 같은 결과가 초래된다

```javascript
var a = [];

a["13"] = 42;

a.length; // 14
```

### 유사 배열

> 유사 배열 값: 숫자 인덱스가 가리기키는 값들의 집합

유사 배열 값을 진짜 배열로 바꾸고 싶을 때

=> indextOf(), concat(), forEach()


혹은 slice() 함수의 기능을 차용하는 방법
```javascript
function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar", "baz"); // ["bar", "baz", "bam"]
```


**ES6부터는 기본 내장 함수 Array.from()이 이 일을 대신함**

```javascript
...
var arr = Array.from(arguments);
...
```
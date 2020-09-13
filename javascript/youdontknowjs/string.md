# 문자열

* 문자열은 배열과 겉모습이 닮았다 \(유사 배열\)
* 이를테면, 둘 다 length 프로퍼티와 indexOf\(\), concat\(\) 메서드를 가진다

그렇다면 기본적으로 둘 다 '문자의 배열'이라고 할 수 있을까? 그렇지 않다!

```javascript
var a = "foo";
var b = ["f", "o", "o"];

a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f", "O", "o"]
```

* 문자열은 불변값이지만 배열은 가변값이다
* 문자열은 불변값이므로 문자열 메서드들은 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 반환한다
* 배열 메서드들은 그 자리에서 곧바로 원소를 수정한다

```javascript
c = a.toUpperCase();
a === c; // false
a; // foo
c; // FOO

b.push("!");
b; // ["f", "O", "o", "!"]
```

**문자열을 다룰 때에 유용한 대부분의 배열 메서드는 사실상 문자열에 쓸 수 없지만, 문자열에 대해 불변 배열 메서드를 빌려 쓸 수는 있다**

```javascript
a.join; // undefined
a.map; // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
    return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o";
d; // "F.O.O."
```

## 문자열의 순서를 거꾸로 뒤집는 법

배열에는 reverse\(\)라는 가변 메서드가 존재한다

```javascript
a.reverse; // undefined

b.reverse(); // ["!", "o", "O", "f"]
b; // ["i", "o", "O", "f"]
```

문자열은 불변값이라 바로 변경되지 않으므로 배열의 가변 메서드는 통하지 않고, 그래서 '빌려 쓰는 것' 또한 불가능

```javascript
Array.prototype.reverse.call(a);
// 여전히 String 객체 래퍼를 반환
```

일단 문자열을 배열로 바꾸고 원하는 작업을 수행한 후 다시 문자열로 되돌리는 것이 또 다른 꼼수다.

> 하지만 유니코드 문자가 섞여있는 경우 이 방법은 통하지 않는다. 따라서 유니코드를 인식하는 정교한 라이브러리 유틸리티 예컨대, 에스레베르 등이 필요할 것이다

```javascript
var c = a 
    .split("") // 'a'를 문자의 배열로 분할한다
    .reverse() // 문자 배열의 순서를 거꾸로 뒤집는다
    .join(""); // 문자 배열을 합쳐 다시 문자열로 되돌린다

c; // "oof"
```


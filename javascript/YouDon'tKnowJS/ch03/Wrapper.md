## 래퍼

자바스크립트는 원시 값을 알아서 박싱(래핑)하므로 다음과 같은 코드가 가능

```javascript
var a = "abc";

a.length; // 3
a.toUpperCase(); // "ABC"
```

> 브라우저 엔진이 알아서 암시적으로 원시값을 박싱하게 하는 것이 좋다. 즉, new String("abc"), new Number(42)처럼 코딩하지 말고, 그냥 알기 쉽게 원시값 "abc", 42를 사용하자


### 객체 래퍼의 함정

```javascript
var a = new Boolean(false);

if (!a) {
    console.log("Oops"); // 실행되지 않음
}
```

만약 수동으로 원시값을 박싱하려면 Object() 함수를 이용하자

```javascript
var a = "abc";
var b = new String(a);
var c = Object(a);

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String // true
c instanceof String // true
 
Object.prototype.toString.call(b); // "[object String]"
Object.prototype.toString.call(c); // "[object String]"
```


### 언박싱

객체 래퍼의 원시값은 valueOf() 메서드로 추출

```javascript
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true

var d = new String("abc");
var e = d + ""; // e에는 없박싱된 원시값 "abc" 대입

typeof d; // "object"
typeof e; // "string"
```
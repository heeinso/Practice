## 함수 vs 블록 스코프

스코프는 컨테이너 또는 바구니 역할을 하는 일종의 '버블'이고 변수나 함수같은 확인자가 그 안에서 선언된다


### 함수 기반 스코프

```javascript
function foo(a) {
    var b = 2;
    // some code
    function bar() {
        // ...
    }    
    // more code
    var c = 3;
}
```

a, b, c, bar 모두 foo()의 스코프 버블에 속하므로 foo() 바깥에서는 이들에게 접근할 수 없다. 따라서 다음 코드는 호출된 확인자가 글로벌 스코프에는 없기 때문에 ReferenceError 오류를 발생시킨다

### 블록 스코프

블록 스코프의 목적은 변수를 최대한 사용처 가까이에서 최대한 작은 유효 범위를 갖도록 선언하기 위함이다

```javascript
var foo = true;

if (foo) {
    var bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}
```

위의 코드는 보기에만 스코프처럼 보이는 '가짜' 블록 스코프로 bar를 의도치 않게 다른 곳에서 사용하지 않도록 상기시키는 역할을 할 뿐이다


다행히도 ES6에서 새로운 키워드 let이 채택됐다. 

```javascript 1.7
var foo = true; 

if (foo) {
    { // <-- explicit block
        let bar = foo * 2;
        bar = something(bar);
        console.log(bar);
    }
}
console.log(bar); // ReferenceError
```

ES6에서는 키워드 let과 함께 const도 추가됐다. const 역시 블록 스코프를 생성하지만 선언된 값은 고정된다(상수)
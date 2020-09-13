# 연산자 우선순위

자바스크립트에서 &&, \|\| 연산자는 단순히 true/false를 반환하는게 아니라, 독특하게도 피연산자 중 하나를 선택하여 반환한다.

**연산자가 2개, 피연산자가 3개면??**

```javascript
var a = 42;
var b = "foo";
var c = [1, 2, 3];

a && b || c; // "foo"
a || b && c; // 42
```

## 단락 평가

```javascript
function doSomething(opts) {
    if (opts && opts.cool) {
        // ...
    }
}
```

opts && otps.cool에서 opts는 일종의 가드다. 만약 opts가 존재하지 않거나 객체가 아니라면 당연히 otps.cool은 에러일 수 밖에 없다. 하지만 opts를 먼저 단락 평가해보고 그 결과가 실패면 opts.cool은 자동으로 건너뛰니 결과적으로 에러는 나지 않는다.

```javascript
function doSomething(opts) {
    if (opts.cache || primeCache()) {
        // ...
    }
}
```

opts.cache를 먼저 체크해서 OK면 굳이 primeCache\(\) 함수는 호출하지 않고 넘어갈 수 있다. 그래서 불필요한 작업이 줄어든다.


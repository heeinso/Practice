## Statement

자바스크립트에서 문(Statement)은 문장(Sentence), 표현식(Expression)은 어구(Phase), 연산자는 구두점/접속사에 해당됨

```javascript
var a = 3 * 6;
var b = a;
b;
```
여기서 각각은 표현식이자 표현식이 포함된 문이다


### 문의 완료 값

모든 문은 완료 값을 가진다. 예컨대, 보통의 { } 블록은 내부의 가장 마지막 문/표현식의 완료 값을 자신의 완료 값으로 반환한다

```javascript
var b;

if (true) {
    b = 4 + 38;
}

// 브라우저 콘솔 창에서 실행하면 42가 나온다
```


### 표현식의 부수 효과

```javascript
function vowels(str) {
    if (str) {
        matches = str.match(/[aeiou]/g]);
        
        if (matches) {
            return matches;
        }
    }
}

vowels("Hello World"); // ["e", "o", "o"]
```

많은 사람이 문자열에서 모음을 추출하는 코드를 위와 같이 작성하지만, 할당 연산자의 부수 효과를 잘 활용하면 다음과 같이 2개의 if 문을 하나로 합칠 수 있다

```javascript
function vowels(str) {
    var matches;
    
    if (str && (matches = str.match(/[aeiou]/g))) {
     return matches;   
    }
}

vowels("Hello World"); // ["e", "o", "o"]
```



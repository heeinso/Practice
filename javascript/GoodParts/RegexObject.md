## 정규 표현식 객체 생성

* 정규 표현식 리터럴은 /로 묶인다 
* /는 나누기와 주석에도 사용되기 때문에 주의 필요


### 3가지 플래그

* g : Global
    * 여러 번 일치함 정확한 의미는 메소드에 따라 다름
* i : Insensitive
    * 대소문자를 구분하지 않음
* m : Multiline
    * ^과 $이 라인 끝 문자에 일치할 수 있음
    
    
    
### RegExp 생성자

* 이 생성자는 문자열을 받아서 RegExp 객체로 컴파일함

```javascript
// 자바스크립트의 문자열에 일치하는 정규 표현식 객체 생성

var my_regexp = new RegExp("\"(?:\\.|[^\\\\\\\"])*\"", 'g');
```

* global : g 플래그가 사용된 경우 true
* ignoreCase: i 플래그가 사용된 경우 true
* lastIndex: 다음 exec 실행을 위한 시작점을 나타냄. 초기값은 0
* multiline: m 플래그가 사용된 경우 true
* source: 정규 표현식의 소스 텍스트 


```javascript
function make_a_matcher() {
  return /a/gi;
}
  
var x = make_a_matcher();
var y = make_a_matcher();

// x와 y는 같은 객체

x.lastIndex = 10;

document.writeln(y.lastIndex); // 10
```




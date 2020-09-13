## 문장 (Statements)


* 하나의 컴파일 단위에는 실행을 위한 문장들이 포함됨
    * 웹브라우저에서 각각의 \<script> 태그는 컴파일되어 즉시 실행되는 하나의 컴파일 단위
    * 링커가 없기 때문에 자바스크립트는 모든 문장을 공통적인 전역 이름 공간에 한 데 몰아넣음
    * var 문은 함수 내부에서 사용될 때 함수의 private 변수를 정의
    
* 다음은 거짓에 해당하는 값들 (이 외에 모든 값은 참)
    * false
    * null
    * undefined
    * 빈 문자열 ''
    * 숫자 0
    * NaN
    
* for 문의 형식
    1. for (초기화; 조건 표현식; 증가;)
    ```javascript
    for (var i=0; i<10; i++) {
      console.log(i+1); // 1, 2, 3, ..., 10
  }
    ```
    
    2. for (이름 in 표현식)
    ```javascript
    for (myvar in obj) {
      if (obj.hasOwnProperty(myvar)) {
      console.log("Exist!");
    }
  }
    ```
    
* 
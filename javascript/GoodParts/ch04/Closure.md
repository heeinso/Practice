## 클로저 (Closer)

* 유효범위와 관련해 내부 함수에서 자신을 포함하고 있는 외부 함수의 매개변수와 변수들을 접근할 수 있다는 특성은 매우 유용하다

* 이러한 특성과 관련하여 더 흥미로운 경우는 외부 함수보다 내부 함수가 더 오래 유지될 때이다

* myObject를 객체 리터럴로 초기화하는 대신에 다음에 나오는 코드처럼 객체 리터럴을 반환하는 함수를 호출하여 초기화한다
    * 이러면 getValue를 통해 value라는 변수에 접근할 수 있지만 함수 유효범위 때문에 프로그램의 나머지 부분에서는 접근할 수 없다
    
```javascript
var myObject = function() {
  var value = 0;
  
  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  };
}();
```


* myObject에 함수를 할당한 것이 아니라 함수를 호출한 결과를 할당하고 있다
* 함수는 메소드 두 개를 가진 객체를 반환하며 이 두 메소드는 계속해서 value라는 변수에 접근할 수 있다


```javascript
// quo라는 함수 생성하는데 이 함수는 get_status라는 메소드와
// status라는 private 속성을 가진 객체를 반환

var quo = function(status) {
  return {
    get_status: function() {
      return status;
    }
  };
};

// quo의 인스턴스를 생성

var myQuo = quo("amazed");
document.writeln(myQuo.get_status());
```

> quo 함수는 new 키워드 없이 사용하게 설계되었다. 그래서 이름을 대문자로 표기하지 않았다. quo를 호출하면 get_status 메소드가 있는 객체를 반환한다. 이 객체에 대한 참조는 myQuo에 저장. get_status 메소드는 quo가 이미 반환된 뒤에도 quo의 status에 계속해서 접근할 수 있는 
권한을 갖게 됨. 

>**get_status**는 **status** 매개변수의 복사본에 접근할 수 있는 권한을 갖는 것이 아니라 매개변수 그 자체에 대한 접근 권한을 갖는다. 이러한 것이 가능한 것은 함수가 자신이 생성된 함수, 즉 자신을 내포하는 함수의 문맥에 접근할 수 있기 때문이다. 이를 클로저(closer)라고 부른다.


* 더 유용한 예제

```javascript
// DOM 노드의 색을 노란색으로 지정하고 흰색으로 사라지게 하는 함수 정의

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FF' + hex;
    if (level < 15) {
      level++;
      setTimeout(step, 1000);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);
```

* 재귀적으로 step 함수가 호출되면 변수 level의 값이 누적되어 증가한다. fade 함수는 이미 반환됐지만 함수 안의 변수는 이를 필요로 하는 내부 함수가 하나 이상 존재하는 경우 계속 유지된다

> 내부 함수가 외부 함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것을 이해하라! 그렇지 않으면 다음과 같은 문제를 발생시킬 수도 있다

```javascript
/* 나쁜 예제
잘못된 방법으로 노드 배열에 이벤트 핸들러 함수를 할당하는 함수 정의
노드를 클릭하면 해당 노드가 몇 번째 노드인지를 경고창으로 알려주는 것이 함수의 목적
하지만 항상 전체 노드의 수만을 보여줌 
*/

var add_the_handlers = function(nodes) {
  var i;
  for (i=0; i<node.length; i++) {
    nodes[i].onclick = function(e) {
      alert(i);
    };
  }
};
```

```javascript
/* 더 나은 예제
올바른 방법으로 노드 배열에 이벤트 핸들러 함수를 할당하는 함수 정의. 노드를 클릭하면 해당 노드가 몇 번째 노드인지를 경고창으로 알려줌
*/

var add_the_handlers = function(nodes) {
  var i;
  for (i=0; i<nodes.length; i++) {
    nodes[i].onclick = function(i) {
      return function(e) {
        alert(i);
      }
    }(i);
  }
};
```

* 이제 onclick에 함수를 할당하는 대신에 새로 함수를 정의하고 여기에 i를 넘기면서 곧바로 실행시켰다. 
* 실행된 함수는 add_the_handlers에 정의된 i가 아니라 넘겨받은 i의 값을 이벤트 핸들러 함수에 연결하여 반환한다. 이 반환되는 이벤트 핸들러 함수는 onclick에 할당한다.
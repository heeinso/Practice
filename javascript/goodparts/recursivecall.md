# 재귀적 호출 \(Recursive Call\)

* 재귀 함수는 직접 또는 간접적으로 자신을 호출하는 함수
* 재귀적 호출은 어떤 문제가 유사한 하위 문제로 나뉘어지고 각각의 문제를 같은 해결 방법으로 처리할 수 있을 때 사용할 수 있는 강력한 프로그래밍 기법
* 일반적으로 재귀 함수는 하위 문제를 처리하기 위해 자신을 호출함

```javascript
var hanoi = function(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc-1, src, dst, aux);
    document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc -1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');
```

* hanoi 함수는 자신을 재귀적으로 호출할 때 현재 작업하고 있는 원반의 위에 있는 원반을 처리한다
* 재귀 함수는 웹 브라우저의 DOM 같은 트리 구조를 다루는데 매우 효과적
* 각각의 재귀적 호출이 트리 구조의 항목 하나에 대해 작동하면 효율적으로 트리 구조를 다룰 수 있다

```javascript
// 주어진 노드부터 HTML 소스 순으로 DOM 트리의
// 모든 노드를 방문하는 walk_the_DOM 함수 정의
// 이 함수는 차례로 가각의 노드를 넘기면서 함수 호출
// walk_the_DOM은 각각의 자식 노드들을 처리하기 위해 자신을 호출

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while(node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

// getElementByAttribute 함수 정의
// 이 함수는 속성 이름과 일치하는 값을 인수로 받음
// 또한 노드에서 속성 이름을 찾는 함수를 전달하며
// walk_the_DOM을 호출
// 일치하는 노드는 results 배열에 저장됨

var getElementByAttribute = function(att, value) {
  var results = [];

  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });

  return results;
};
```

* 꼬리 재귀 최적화는 함수가 자신을 재귀적으로 호출하는 것을 반환하는 방법으로 진행되는 재귀적 호출일 경우 이를 개선하여 속도를 매우 빠르게 향상시키는 반복실행으로 대체하는 것

```javascript
// 꼬리 재귀를 하는 factorial 함수를 만듦
// 호출 자체의 결과를 반환하기 때문에 꼬리 재귀
// 현재 자바스크립트는 이러한 유형에 대해 최적화를 제공하지 않음

var factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i-1, a * i);
};
document.writeln(factorial(4)); // 24
```


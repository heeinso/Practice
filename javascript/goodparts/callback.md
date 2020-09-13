# 콜백 \(Callback\)

* 함수는 비연속적인 이벤트를 다루는 것을 좀더 쉽게 할 수 있는 방법을 제공한다
  * 예컨대, 사용자와 상호작용으로 시작해서 서버로 요청을 하고 마지막으로 요청에 대한 응답을 보여주는 일련의 작업 흐름이 있다고 가정하고 가장 고지식한 방법으로 구현하면 다음과 같다.

```javascript
request = prepare_the_request();
response = send_request_synchronously(request);
display(response);
```

> 이러한 방법으로 작업을 해결할 때의 문제는 동기화된 요청을 하기 때문에 서버로부터 응답이 올 때까지 클라이언트는 꼼짝없이 멈춰서 기다려야 한다는 것이다. 만약 네트워크나 서버가 느리다면 이 애플리케이션은 응답성에 있어서 이해할 수 없을 만큼 최악일 것이다

* 위와 같은 작업을 처리하는 좋은 방법은 서버로 요청을 비동기식으로 하고 서버의 응답이 왔을 때 호출되는 콜백 함수를 제공하는 것이다.
  * 비동기식 함수는 서버의 응답을 기다리지 않고 그 즉시 반환되기 때문에 클라이언트는 멈춤 상태로 빠지지 않는다.

```javascript
request = prepare_the_request();
send_request_asynchnonously(request, function(response) {
    display(response);
  });
```


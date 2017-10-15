/*
setTimeout()의 두번쨰 매개변수는 자바스크립트 엔진이 해당 밀리초만큼
기다린 다음 작업을 큐에 추가하도록 한다. 또한 setTimeout()을 호출하면
해당 타임아웃의 숫자형 ID를 반환한다. 타임아웃 ID는 코드의 고유 식별자이며
타임아웃을 취소할 때 사용한다. 대기 중인 타임아웃을 취소하려면 아래처럼
clearTimeout() 메서드에 타임아웃 ID를 넘기면 된다.
*/

// 타임아웃 설정
var timeoutId = setTimeout(function() {
    alert("Hello world!");
}, 1000);

// 타임아웃 취소
clearTimeout(timeoutId);

/*
인터벌은 타임아웃과 비슷하지만 페이지가 종료되거나 인터벌을 취소하기 전에는 일정한
시간마다 코드를 반복 실행한다는 점이 다르다. 아래 예제에서 변수 num은 매 0.5초마다
증가하여 최댓값에 도달할 때까지 반복하고 도달하면 인터벌을 취소한다.
*/

var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber() {
    num++;
    if (num == max) {
        clearInterval(intervalId);
        alert("Done!");
    }
}

intervalId = setInterval(incrementNumber, 500);

// 위 예제를 타임아웃을 이용해서 구현

var num = 0;
var max = 10;

function incrementNumber() {
    num++;
    if (num < max) {
        setTimeout(incrementNumber, 500);
    } else {
        alert("Done!");
    }
}

setTimeout(incrementNumber, 500);
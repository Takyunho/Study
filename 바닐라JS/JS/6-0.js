//Quotes


/*
Math.random
= random()은 0부터 1사이의 랜덤한 숫자를 제공한다.

Math.random()에 10을 곱하면 0에서 10 사이의 숫자들을 얻을 수 있다.
= Math.random() * 10



**************** 정수만 필요한 경우, 세가지 함수를 사용 가능 ****************
1. round() = 반올림
예를 들어서 1.1이 있다고 치면 round()는 1로 돌려준다.

=> Math.round(1.1) => 1
1.5부터는 반올림해서 2가 됨.


2. ceil() = 올림
ceil()이 하는건 숫자를 천장(ceil)까지 높여주는 것임.
말 그대로 머리 꼭대기 천장까지

=> Math.ceil(1.0) 은 1이 되고,
Math.ceil(1.1)은 2가 됨. 1.01도 2가 됨
즉, 1.0만 1이 되고 1.01부터는 반올림함

3. floor() = 내림
floor()는 내가 걸어 다니는 마루(floor)까지 숫자를 내려주는 것임.

=> Math.floor(1.99999) => 1이 됨.
*********************************************************************************

우리가 해야 할 건 랜덤하게 얻은 숫자에 10을 곱해서 floor()를 사용
-> Math.floor(Math.random() * 10)

-> console.log(quotes[Math.floor(Math.random() * 10)]);
위와 같은 식으로 사용

Math.floor(Math.random() * 10) 가 전부 숫자가 되는 것임을 명심!

그러나, 배열의 길이가 길면 문제가 됨. 따라서, 배열의 길이를 통해 숫자를 랜덤으로 뽑을 수 있다.
Array.length를 사용하면 Array의 길이를 반환해줌
즉, console.log(quotes[Math.floor(Math.random() * 10)]);를
-> console.log(quotes[Math.floor(Math.random() * quote.length)]);로 사용 가능!!!!
*/
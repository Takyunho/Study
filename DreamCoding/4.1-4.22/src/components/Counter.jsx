import React, { useState } from 'react';

export default function Counter() {
  // useState() 함수는 배열을 반환한다.
  const [number, setNumber] = useState(0);
  //@ 배열의 첫번째는 값을 가르키고 있는 변수,
  //@ 배열의 두번째는 값을 업데이트하는 함수이다.


  return (
    <div className='counter'>
      <span className='number'>{ number}</span>
      <button className='button' onClick={() => {
        //* useState 사용시 유의할 점
        // setNumber(number + 1);
        // setNumber(number + 1);
        // setNumber(number + 1);
        // setNumber(number + 1);
        // setNumber(number + 1);  // 1, 2, ...
        // 위의 결과는 5씩 더해지는 것이 아니라 1씩 더해짐
        //# 왜냐하면 setNumber가 전달될 때 클로저에 의해 외부 변수인 number가 0으로 캡처(고정)되어 있기 때문

        // 따라서 5씩 더해지도록 하기 위해서는 아래처럼 이전 값을 콜백으로 받아오고, 그 값을 더해줘야 함
        setNumber((prev) => prev + 1) // {return number + 1}과 동일
        setNumber((prev) => prev + 1)
        setNumber((prev) => prev + 1)
        setNumber((prev) => prev + 1)
        setNumber((prev) => prev + 1) // 5, 10, ... 
      }}>Add +</button>
    </div>
  );
}


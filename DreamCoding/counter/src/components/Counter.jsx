import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const addNumber = () => {
    /* 
    만약에 setCount를 여러번 실행하면?!

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // => 1이 출력됨

    5가 나올거같지만 1이 나옴
    왜냐하면 addNumber 함수가 실행될 때 count는 0으로 고정되어버리기 때문(closure)
    */
    
    /* 
    따라서 아래처럼 콜백함수를 줘서 사용해야 함 
    (콜백 안의 이름은 이전값을 의미하는 단어면 상관없음) 
    */
    setCount((이전카운트값) => { return 이전카운트값 + 1})
    setCount((이전카운트값) => 이전카운트값 + 1)
    setCount((이전카운트값) => 이전카운트값 + 1)
    setCount((이전카운트값) => 이전카운트값 + 1)
    setCount((이전카운트값) => 이전카운트값 + 1)
    console.log(count)    // 5, 10, 15 ...가 찍힘
  }

  return (
    <div className='counter'>
      <span className='number'>{ count }</span>
      <button className='button' onClick={addNumber}>Add +</button>
    </div>
  );
}


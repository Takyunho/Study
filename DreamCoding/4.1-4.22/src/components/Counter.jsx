import React, { useState } from 'react';

export default function Counter() {
  // useState() 함수는 배열을 반환한다.
  const [number, setNumber] = useState(0);

  return (
    <div className='counter'>
      <span className='number'>{ number}</span>
      <button className='button' onClick={() => {
        setNumber(number + 1);
      }}>Add +</button>
    </div>
  );
}


import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const addNumber = () => {
    setCount(count + 1); 
    console.log(count)
  }

  return (
    <div className='counter'>
      <span className='number'>{ count }</span>
      <button className='button' onClick={addNumber}>Add +</button>
    </div>
  );
}


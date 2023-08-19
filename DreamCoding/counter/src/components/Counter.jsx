import React, { useState } from "react";

export default function Counter({ totalCount, onClick }) {
  const [count, setCount] = useState(0);

  const addNumber = () => {
    // 각각의 count 1씩 증가시키기
    setCount((prevCount) => prevCount + 1);
    // 받아온 onClick 함수 실행하여 totalCount 증가시키기
    onClick();  
  };

  return (
    <div className="counter">
      <span className="number">
        {count} <span className="total-number">/ {totalCount}</span>
      </span>
      <button className="button" onClick={addNumber}>
        Add +
      </button>
    </div>
  );
}

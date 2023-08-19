import React, { useState } from "react";

export default function Counter({ totalCount, setTotalCount, setEmoji }) {
  const [count, setCount] = useState(0);

  const addNumber = () => {
    setCount((prevCount) => prevCount + 1);
    console.log(count);
    setTotalCount((prevTotalCount) => prevTotalCount + 1);

    if(totalCount > 9) {
      // replace를 쓰나 그냥 이전값을 바꾸나 같은 결과가 나온다.
      setEmoji((prevEmoji) => "🔥")
      // setEmoji((prevEmoji) => prevEmoji.replace("😎", "😡"))
    }
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

import React, { useState } from "react";

// export default function Counter({ totalCount, setTotalCount }) {
export default function Counter({ totalCount, increaseTotalCount }) {
  const [number, setNumber] = useState(0);

  return (
    <div className="counter">
      <span className="number">
        {number}/{totalCount}
      </span>
      <button
        className="button"
        onClick={() => {
          setNumber((prev) => prev + 1);
          // setTotalCount((prevTotal) => prevTotal + 1);
          increaseTotalCount();
        }}
      >
        Add +
      </button>
    </div>
  );
}

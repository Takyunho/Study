import Counter from "./components/Counter";
import "./App.css";
import { useState } from "react";

export default function AppCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const handleClick = () => setTotalCount((prev) => prev + 1)

  return (
    <div className="Container">
      <div>
        <p>
          Total Count : {totalCount} <span>{ totalCount > 10 ? '🔥' : '😎'}</span>
        </p>
      </div>
      <Counter
        totalCount={totalCount}
        onClick={handleClick}
      />
      <Counter
        totalCount={totalCount}
        onClick={handleClick}
      />
    </div>
  );
}

import Counter from "./components/Counter";
import "./App.css";
import { useState } from "react";

export default function AppCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const [emoji, setEmoji] = useState("😎");

  return (
    <div className="Container">
      <div>
        <p>
          Total Count : {totalCount} <span>{emoji}</span>
        </p>
      </div>
      <Counter
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        setEmoji={setEmoji}
      />
      <Counter
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        setEmoji={setEmoji}
      />
    </div>
  );
}

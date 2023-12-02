import React, { useState } from "react";
import Counter from "./components/Counter";
import "./AppCounter.css";

//@ 4.15 내부 상태관리 State
export default function AppCounter() {
  const [totalCount, setTotalCount] = useState(0);

  //* 함수를 정의하고 그 함수를 자식컴포넌트에게 넘겨주자
  const increaseTotalCount = () => {
    setTotalCount((prevTotal) => prevTotal + 1);
  }

  return (
    <div>
      <div className="totalCount">
        <h2>
          ToTal Count : {totalCount} {totalCount > 10 ? "🔥" : "😎"}
        </h2>
      </div>
      {/* <Counter totalCount={totalCount} setTotalCount={setTotalCount}></Counter>
      <Counter totalCount={totalCount} setTotalCount={setTotalCount}></Counter> */}
      <Counter
        totalCount={totalCount}
        increaseTotalCount={increaseTotalCount}
      ></Counter>
      <Counter
        totalCount={totalCount}
        increaseTotalCount={increaseTotalCount}
      ></Counter>
    </div>
  );
}

//# 값뿐만 아니라, set함수도 props로 전달할 수 있다.

/* 강사님 댓글
내 컴포넌트의 상태를 외부에서 임의로 설정하는건 조금 위험할 수 있어요.
지금 우리가 원하는건 증가만 가능한건데 (왜냐, 카운터는 무조건 증가만 하니깐), 이렇게 setCount를 다른곳에 전달해 버리면, 감소 시킬 수도 있고, 마이너스값으로 설정할 수도 있겠죠?
외부에 전달하는 props 콜백함수 및 외부로 노출하는 API는 우리가 노출하고 싶은 범위 내에서, 최대한 좁혀서 제공해 주는게 좋답니다 :)
*/

//* 즉, useState의 set함수를 자식 컴포넌트로 넘겨서 사용하는 것이 아니라, 부모 컴포넌트에서 함수를 정의 하고 그 함수를 자식 컴포넌트로 넘겨서 사용하는 것이 좋다.
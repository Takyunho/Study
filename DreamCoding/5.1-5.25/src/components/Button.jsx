import React, { memo, useMemo } from "react";

const Button = memo(({ text, onClick }) => {
  console.log("button", text, "re-rendering");   // React.memo를 사용하더라도 useCallback으로 감싸주지 않으면 리 렌더링 된다. (함수가 계속 재 생성되므로, 새로운 함수라고 판단해서 onClick을 가져오는 props 객체가 변경되었다고 판단하는 듯?)
  // const result = calculateSomething();

  //@ useMemo를 이용해서 매번 호출되지 않도록 만들 수 있다.
  // 특정한 dependencies를 주지 않는 이상 한번만 호출된다.
  // 예를 들어, text가 변경될 때 호출되게 하고 싶다면, [text]를 dependencies로 주면 된다.
  const result = useMemo(() => calculateSomething(), []);

  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "20px",
    margin: "0.4rem",
  };

  return (
    <div>
      <button onClick={onClick} style={buttonStyle}>
        {text}
      </button>
    </div>
  );
});

export default Button;


function calculateSomething() {
  // 복잡한 계산을 한다고 가정
  for (let i = 0; i < 10000; i++) {
    console.log("Something📌");
  }
  return 10;
}

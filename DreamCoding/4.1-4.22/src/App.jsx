import logo from "./logo.svg";
import "./App.css";

export default function App() {
  //@ JSX에서 주의 사항
  // 1. 꼭 하나의 태그로 반환해야 한다.
  // <></> : Fragment
  // 2. class는 className으로 작성한다.
  // 3. 자바스크립트 코드는 {}에 작성한다.
  // 4. style은 객체로 작성가능하다.

  const name = "리액트";
  const style = {
    width: "200px",
    height: "100px",
    backgroundColor: "yellow",
  }

  return (
    <>
      <div>
        <p>{name}</p>
        <h1 style={style}>안녕하세요</h1>
        <h2 style={{ width: "200px", height: "100px" }}>반갑습니다.</h2>
      </div>
    </>
  );
}

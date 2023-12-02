import "./App.css";

export default function AppJSX() {
  //@ 4.4 ~ 4.5 JSX에서 주의 사항
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

  const list = ['우유', '딸기', '바나나', '요거트'];

  return (
    <>
      <div>
        {/* 문자열과 변수를 사용할 떄 똑같이 템플릿 리터럴 이용 */}
        <p>{`Hello ${name}`}</p>
        <h1 style={style}>안녕하세요</h1>
        <h2 style={{ width: "200px", height: "100px" }}>반갑습니다.</h2>
      </div>
      <ul>
        {/* map함수를 이용해 배열을 반환 */}
        {
          // 1.
          list.map((item) => <li>{item}</li>)
          // 2.
          // list.map(item => (
          //   <li>{item}</li>
          // ))
          // 3.
          // list.map((item) => {
          //   return <li>{item}</li>;
          // })
          // 4.
          // list.map(function (item) {
          //   return <li>{item}</li>;
          // })
        }
      </ul>
    </>
  );
}

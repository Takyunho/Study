import "./App.css";
import Profile from "./components/Profile";

export default function AppProfile() {
  //@ 4.7 컴포넌트 만드는 꿀팁
  // component들은 src/components/ 폴더에 저장한다.
  // 컴포넌트의 이름은 대문자로 시작하고, 카멜케이스로 작성한다.
  // 그러나 Next.js에서는 App-jsx 이런식으로 사용하기도 함
 
  return (
    <>
      <Profile></Profile>
      <Profile></Profile>
    </>
  );
}

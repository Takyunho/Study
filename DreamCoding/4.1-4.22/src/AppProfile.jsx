import "./App.css";
import Profile from "./components/Profile";

export default function AppProfile() {
  //@ 4.7 컴포넌트 만드는 꿀팁
  // component들은 src/components/ 폴더에 저장한다.
  // 컴포넌트의 이름은 대문자로 시작하고, 카멜케이스로 작성한다.
  // 그러나 Next.js에서는 App-jsx 이런식으로 사용하기도 함

  return (
    <>
      {/* 4.9 props 사용 */}
      <Profile
        image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        name="James Kim"
        title="프론트엔드 개발자"
        isNew={true}
      ></Profile>
      <Profile
        image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80"
        name="kim James"
        title="백엔드 개발자"
        isNew={false}
      ></Profile>
      <Profile
        image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
        name="series Kim"
        title="AI 개발자"
      ></Profile>
    </>
  );
}

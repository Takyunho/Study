import "./App.css";
import Profile from "./components/Profile";
import Avatar from "./components/Avatar";

export default function AppProfile() {
  //@ 4.7 컴포넌트 만드는 꿀팁
  // component들은 src/components/ 폴더에 저장한다.
  // 컴포넌트의 이름은 대문자로 시작하고, 카멜케이스로 작성한다.
  // 그러나 Next.js에서는 App-jsx 이런식으로 사용하기도 함

  //@ 4.14 Event 처리하기
  const handleClick = (event) => {
    //^ react에서 event는 SyntheticBaseEvent로 한번 감싸진 상태로 들어온다.
    console.log(event)
    alert("클릭됨!")
  }
  return (
    <>
      <button onClick={handleClick}>버튼</button>
      {/* <button onClick={handleClick()}>버튼</button> 처럼 함수를 호출해서는 안된다!!! */}

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
      <Avatar
        image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
        isNew={true}
      ></Avatar>
    </>
  );
}

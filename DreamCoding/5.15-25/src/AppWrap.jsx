import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";
import Card from "./components/Card";

export default function AppWrap() {
  return (
    <div>
      <Navbar>
        {/* 
        여기에 작성한 내용이 Navbar의 파라미터로 들어가고(children),
        Navbar.jsx에서는 {children}으로 받아서 사용할 수 있다.
        */}
        <Avatar
          image="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          name="john"
          size={200}
        ></Avatar>
        <p>children을 이용하여 컴포넌트 재사용하기</p>
      </Navbar>

      <Card>
        <p>Card 1</p>
      </Card>
      <Card>
        <h1>Card 2</h1>
        <p>무조건 children으로 전달받아야댐</p>
      </Card>
      <Card></Card>
    </div>
  );
}



// 사용하고 싶은 곳에서 자유자재로 원하는걸 넣고 싶으면?
// high order component

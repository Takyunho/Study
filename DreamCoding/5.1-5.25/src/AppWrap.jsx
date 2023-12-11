import React from "react";

//^ 5.15 컴포넌트의 재사용 1
//@ children을 이용해서 컴포넌트의 내용을 바꿀 수 있다.
// 사용하고자 하는 컴포넌트 안에다가 내용을 기재하고, 자식 컴포넌트의 파라미터에 {children}을 넣어주고 사용하면 된다.

export default function AppWrap() {
  return (
    <div>
      <Navbar>
        <Avatar
          image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          name="Bob"
          size={200}
        />
        <p>children을 이용해서 컴포넌트의 내용을 바꿀 수 있다.</p>
      </Navbar>
      <Navbar>
        <Avatar
          image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          name="Bob"
          size={200}
        />
        <h2>내용이 달라져요</h2>
        <span>각각 다른 내용</span>
      </Navbar>
      <Card>
        <h1>Card1</h1>
        <p>Card1 내용</p>
      </Card>
      <Card>
        <h1>Card2</h1>
      </Card>
    </div>
  );
}

//@ children을 이용한다.
function Navbar({ children }) {
  return <header style={{ backgroundColor: "yellow" }}>{children}</header>;
}

function Avatar({ image, name, size }) {
  return (
    <div>
      <img
        src={image}
        alt={`${name}'`}
        width={size}
        height={size}
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        backgroundColor: "black",
        borderRadius: "20px",
        color: "white",
        minHeight: "200px",
        maxWidth: "200px",
        margin: "1rem",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

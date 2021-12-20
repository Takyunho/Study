/* eslint-disable */
import logo from './logo.svg';
import React, { useState } from 'react';    // useState 사용을 위해 import
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';  // React Bootstrap에서 코드 가져올때 내가 쓸 컴포넌트 들을 import해야함
import './App.css';
import data from './data.js'; // 가져와서 쓰기

function App() {

  let [shoes, shoes변경] = useState(data);
  // console.log(shoes);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">tyh shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="lh-lg mt-2 background">
        <h1>Hello, world!</h1>
        <p>dasdasdasdasdasas</p>
        <p>
          <Button variant="primary"> 버튼 </Button>{' '}
        </p>
      </div>

      <div className='container'>
        <div className='row'>
          {/* <Cardshoes 슈즈={shoes[0]} />
          <Cardshoes 슈즈={shoes[1]} />
          <Cardshoes 슈즈={shoes[2]} /> */}

          {/* props를 전달할 때 shoes라는 [ {}, {}, {} ] 이렇게 생긴 데이터를 다 전송하는게
          아니라, 각각 카드마다 각각 다른 정보를 전달 할 수도 있다 ... */}
          {/* 즉, 같은 컴포넌트라고 항상 같은 내용만 보여줄 수 있는게 아니다.
          props 등을 이용해 각각 다른 내용을 전송해주면 된다.
          그럼 같은 컴포넌트라고 해도 각각 다른 내용이 출력되는 컴포넌트를 만들 수 있다. 
          다시 말해, 여러개의 컴포넌트를 만들 필요 없음!! */}

          {/* 🔻 위에 반복되는거 map()함수 사용  */}
          {
            shoes.map(function (a, i) {           // 각각의 데이터인 a는 꼭 안써도 되네?
              return (
                <Cardshoes 슈즈={shoes[i]} i={i} key={i} /> // {shoes[i]}대신 {a} 도 가능
              )
            })
          }
        </div>
      </div>

    </div>
  );
}

// 컴포넌트화 하기
// ⭐ 1. 컴포넌트로 만들고, 2.props로 데이터 전송 및 데이터 바인딩하고, 3. 반복문 돌리기
function Cardshoes(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
      {/* src에 변수 넣을때 중괄호로 감싸고 각각 '으로 나눈 후 + */}
      <h4>{props.슈즈.title}</h4>
      <p>{props.슈즈.content} & {props.슈즈.price}</p>
    </div>
  )
}
// function Cardshoes(props) {
//   return (
//     <div className='col-md-4'>
//       <img src='https://codingapple1.github.io/shop/shoes2.jpg' width='100%'></img>
//       <h4>{props.슈즈[1].title}</h4>
//       <p>{props.슈즈[1].content} & {props.슈즈[1].price}</p>
//     </div>
//   )
// }
// function Cardshoes(props) {
//   return (
//     <div className='col-md-4'>
//       <img src='https://codingapple1.github.io/shop/shoes3.jpg' width='100%'></img>
//       <h4>{props.슈즈[2].title}</h4>
//       <p>{props.슈즈[2].content} & {props.슈즈[2].price}</p>
//     </div>
//   )
// }


export default App;



/* eslint-disable */
import logo from './logo.svg';
import React, { useState } from 'react';    
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';

// 4️⃣ index.js 설정 후 라우팅 하기(여러가지 태그들 import)
import { Link, Route, Switch } from 'react-router-dom';


function App() {

  let [shoes, shoes변경] = useState(data);

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


      {/* 5️⃣ 라우팅하기(원하는 곳에 <Route><Route/>태그를 작성) */}
      {/* <Route>안에 path와 path 방문시 보여줄 HTML 작성  */}
      {/* 메인 페이지 */}
      <Route path="/" exact >  {/* exact라는 속성 추가하면 경로가 정확히 일치할 때만 보여줌 */}
        {/* 대문 */}
        <div className="lh-lg mt-2 background">
          <h1>Hello, world!</h1>
          <p>dasdasdasdasdasas</p>
          <p>
            <Button variant="primary"> 버튼 </Button>{' '}
          </p>
        </div>
        {/* 상품들 */}
        <div className='container'>
          <div className='row'>
            {
              shoes.map(function (a, i) {
                return (
                  <Cardshoes 슈즈={shoes[i]} i={i} key={i} /> // {shoes[i]}대신 {a} 도 가능
                )
              })
            }
          </div>
        </div>
      </Route>
      {/* 세부 페이지 */}
      <Route path="/detail">
      <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
</div> 
      </Route>
      
      {/* 아래처럼 div를 넣는게 아니라 component를 넣을 수도 있음 */}
      {/* <Route path="/어쩌구" component={모달창}></Route> */}
      {/* 또는 <Route path="/어쩌구"> <모달창/> </Route>*/}

      {/* ❗ React-Router의 특징 
      HTML 내부의 내용을 갈아치워서 다른 페이지처럼 흉내내는 것일 뿐
      각각 페이지마다 다른 HTML 파일을 보여주는게 아님!!
      */}




    </div>
  );
}


function Cardshoes(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
      <h4>{props.슈즈.title}</h4>
      <p>{props.슈즈.content} & {props.슈즈.price}</p>
    </div>
  )
}


export default App;



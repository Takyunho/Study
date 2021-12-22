/* eslint-disable */
import logo from './logo.svg';
import React, { useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';

function App() {

  let [shoes, shoes변경] = useState(data);
  console.log(shoes);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">tyh shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
              <Nav.Link> <Link to="/detail">Detail</Link> </Nav.Link>
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

      

      <Switch> 
        {/* 메인 페이지 */}
        <Route path="/" exact >
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
                    <Cardshoes 슈즈={shoes[i]} i={i} key={i} />
                  )
                })
              }
            </div>
          </div>
        </Route>
        {/* 세부 페이지 */}

        {/* URL 만들 땐 반복문은 안쓰고 보통 URL 파라미터 문법을 이용해 축약함 */}
        <Route path="/detail/:id">
          {/* :id 자리에 아무 문자나 입력하면 <Detail> 컴포넌트를 보여주세요~ */}
          {/* id라는 부분은 함수 파라미터처럼 자유롭게 작명 */}
          {/* 파라미터는 2개 3개 몇개든 추가할 수 있음 => /detail/:id/:name 이런 식도 가능 */}
          <Detail shoes={shoes} />
        </Route>

      </Switch>

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



/* eslint-disable */
import logo from './logo.svg';
import React, { useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
// Detail 컴포넌트 가져와서 쓰기 위해 import하기
import Detail from './Detail.js';

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
              {/* ⭐ Link 태그로 페이지 이동버튼 만들기 */}
              {/*
              1. 버튼에 달려있는 href 지우고
              2. <Link to="경로"> 버튼이름 </Link>로 작성
              */}
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

      {/* ⭐ 매치되는 <Route> 들을 전부 보여주지 말고
      한번에 하나만 보여주고 싶은 기능을 만들고 싶을 때 ⭐ Switch 사용 */}
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
        <Route path="/detail">
          <Detail />
        </Route>

        <Route path="/:id">       {/* /:id => URL 파라미터라는 문법
        / 슬래시 뒤에 모든 문자가 오면 이 Route로 안내해줘라는 뜻 */ }
          {/* ⭐ 리액트 라우터는 그냥 URL 매치되는 것들 전부를 다 보여주기 때문에
          한번에 하나의 <Route>만 보여주고 싶다 그러면 Switch 태그로 라우터를 감싸야함 */}
          <div>아무거나 적었을때 이거 보여주셈</div>
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



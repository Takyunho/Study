/* eslint-disable */
import logo from './logo.svg';
import React, { useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
// ajax를 위한 axios import
import axios from 'axios';

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
              {/* Link태그 에러 해결 => Link태그 대신 Nav.Link태그에 as={Link} 추가  */}
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail/0">Detail1</Nav.Link>
              <Nav.Link as={Link} to="/detail/1">Detail2</Nav.Link>
              <Nav.Link as={Link} to="/detail/2">Detail3</Nav.Link>
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
            {/* Ajax 쓰려면 axios 설치 후 import */}
            {/* 터미널에 yarn add axios 또는 npm install axios 입력 */}
            <button className='btn btn-primary' onClick={() => {
              // 서버에게 get요청하는 코드
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {     //ajax 요청이 성공했을 때 안의 함수 실행 / then 안의 콜백함수 안에 파라미터를 추가하면 그게 받아온 데이터
                  console.log('성공!');
                  // ajax로 가져온 자료 출력하는 법
                  console.log(result);        // 받아온 전체 데이터(실제 데이터 뿐만 아니라 성공한 이유라든지 그런 여러가지 정보들도 담겨있음)
                  console.log(result.data);   // 받아온 데이터 3개
                })
                .catch(() => {    //ajax 요청이 실패했을 때 안의 함수 실행
                  console.log('실패!');
                })
              // 쌩자바스크립트 문법인 fetch() 문법도 거의 똑같이 사용가능합니다.
              // fetch(요청할URL) 이렇게 쓰시면 그냥 바로 GET 요청해줍니다.
              // fetch(요청할URL).then() 이렇게 쓰는 것도 똑같습니다.
              // 하지만 가져온 자료가 JSON이라면 object로 자동 변환이 안됩니다.
              // JSON 자료는 Object로 변환을 해줘야 하는데,
              // axios 라이브러리를 쓰면 JSON 자료를 가져와도 지가 알아서 따옴표를 제거한
              // Object로 자동으로 만들어줘서 편함. 그러나 fetch()는 그런거 안해줌
            }}>더보기</button>
          </div>
        </Route>
        {/* 세부 페이지 */}
        {/* URL 만들 땐 반복문은 안쓰고 보통 URL 파라미터 문법을 이용해 축약함 */}
        <Route path="/detail/:id">
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



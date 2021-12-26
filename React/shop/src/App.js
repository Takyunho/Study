/* eslint-disable */
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
// ajax를 위한 axios import
import axios from 'axios';

function App() {

  let [shoes, shoes변경] = useState(data);
  let [lodingAlert, lodingAlert변경] = useState(true); 

  // 왜 App.js에 만들었을까?
  // => 중요한 데이터는 상위 컴포넌트에 만드는게 바람직(모든 데이터는 위에서 밑으로 흐른다.)
  let [재고, 재고변경] = useState([10, 11, 12]);


  useEffect(() => {
    axios.get()
      .then()
      .catch();
  }, []);  // 괄호 추가하면 업데이트시 ajax 요청 안하고 등장시에만 한 번 실행

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">tyh shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
          {/* shoes라는 state 갯수 만큼 <Card> 레이아웃을 생성해주세요~  */}
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
            <button className='btn btn-primary' onClick={() => {
              // 로딩중이라는 UI 띄우기
              {
                lodingAlert == true
                ? <div className='lodingAlert'><p>loding</p></div>
                : null
              }

              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  // 로딩중이라는 UI 안보이게 처리
                  lodingAlert변경(false)
                  {
                  lodingAlert == true
                    ? <div className='lodingAlert'><p>loding</p></div>
                    : null
                  }

                  let 요청데이터 = result.data;
                  // shoes state에 ajax 요청 시 전달받은 데이터 추가하기
                  shoes변경([...shoes, ...요청데이터]); // 이러면 기존 state 사본생성 없이도 원하는 데이터를 한큐에 추가할 수 있음
                })
                .catch(() => {
                  // 실패 UI 띄우기
                  lodingAlert변경(true)
                  {
                    lodingAlert == true
                      ? <div className='lodingAlert'><p>로딩실패</p></div>
                      : null
                  }
                  console.log('실패!');
                })
            }}>더보기</button>
          </div>
        </Route>

        {/* 세부 페이지 */}
        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={ 재고 } 재고변경={ 재고변경 }/>
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



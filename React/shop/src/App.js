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

    // useEffect는 컴포넌트 등장 및 업데이트시 실행되는 함수므로,
    // Ajax를 이용해서 페이지 내용을 받아오거나 그럴 때 useEffect()함수 안에 집어넣으면 된다.
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

              // ⭐ 로딩중이라는 UI 띄우기
              {
                lodingAlert == true
                ? <div className='lodingAlert'><p>loding</p></div>
                : null
              }
              

              // ⭐ post 요청
              // 가끔은 데이터를 받아오는게 아니라 서버로 전송하기도 해야합니다.
              // 로그인할 때, 검색할 때, 게시물을 발행할 때... 이런 경우입니다.
              // 서버로 데이터를 전송하시려면 POST 요청을 하시면 됩니다.
              // POST 요청은 데이터 전송할 URL과 전송할 데이터 이 두가지 항목을 입력하실 수 있습니다.

              // axios.post('서버URL', { id: 'yun', pw: 1234 })
              // .then(() => { })
              // .catch(() => { })
              // get 대신 post라는 함수를 쓰면 되며, URL 옆에 두번쨰 파라미터로
              // 원하는 데이터를 입력해주면 된다. 그럼 전송됨
              // 요청할 때 header 정보도 보낼 수 있음
              // 사용법은 구글에 나와 있으니 필요해지면 찾아서 학습)

              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {

                  // ⭐ 로딩중이라는 UI 안보이게 처리
                  lodingAlert변경(false)
                  {
                  lodingAlert == true
                    ? <div className='lodingAlert'><p>loding</p></div>
                    : null
                  }

                  let 요청데이터 = result.data;

                  // shoes state에 ajax 요청 시 전달받은 데이터 추가하기
                  // var 새로운신발들 = [...shoes];
                  // 새로운신발들.push(요청데이터);
                  // shoes변경(새로운신발들);
                  // console.log(shoes);

                  shoes변경([...shoes, ...요청데이터]);
                  // ⭐ [{},{},{} , {},{},{}]가 됨
                  // 1. shoes라는 기존 state 데이터를 괄호 벗겨서 여기 넣어주시고,
                  // 2. result.data라는 ajax 성공시 받아오는 데이터도 괄호 벗겨서 여기 넣어주세요
                  // 3. 그리고 이걸 전부 [] 대괄호로 감싸서 array를 만들어주세요 라는 뜻
                  // 이러면 기존 state 사본생성 없이도 원하는 데이터를 한큐에 추가할 수 있음
                  // (지금 Array 데이터를 다루고 있지만 Object 데이터들도 마찬가지로 ... 괄호벗기기 연산자 사용가능)
                })
                .catch(() => {
                  // ⭐ 실패 UI 띄우기
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



/* eslint-disable */
import logo from './logo.svg';
/*
⭐ 컴포넌트 import할 때 lazy loading하기
웹앱 사이트들은 메인 페이지 방문시 모두 import해옴
그래서 많은 컴포넌트파일을 import 해오라고 써놓으면 사이트 초기 접속속도가
굉장히 느려질 수 있음
Detail, Cart 컴포넌트들은 첫 페이지 방문시 import를 바로 해올 필요는 없으므로,
lazy import를 하면 성능향상
✅ 순서
1. react 라이브러리에서 lazy, Suspense를 import
2. import Detail 처럼 import하던거를 lazy 함수를 이용해 바꾸기
3. <Suspense> 라는 컴포넌트로 <Detail>을 감싸주기
4. fallback 속성에 <Detail> 컴포넌트 로딩 전까지 띄울 원하는 HTML 적기
*/

// 1️⃣ lazy, Suspense import 하기
import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

// import Detail from './Detail.js'; 대신에
// 2️⃣ 아래처럼 작성(import Detail 하던거를 lazy 함수를 이용해 바꾸기)
let Detail = lazy(() => { return import('./Detail.js') }); // <Detail>을 보여줄 때만 import Detail.js해옴
// return 하나면 중괄호랑 리턴 생략가능 lazy(() => import('./Detail.js') );

import axios from 'axios';
import Cart from './Cart.js';

export let 재고context = React.createContext();


function App() {

  let [shoes, shoes변경] = useState(data);
  let [lodingAlert, lodingAlert변경] = useState(true);

  let [재고, 재고변경] = useState([10, 11, 12]);


  // useEffect(() => {
  //   axios.get()
  //     .then()
  //     .catch();
  // }, []);  // 괄호 추가하면 업데이트시 ajax 요청 안하고 등장시에만 한 번 실행


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
          <div className='container'>
            <재고context.Provider value={재고}>
              <div className='row'>
                {
                  shoes.map(function (a, i) {
                    return (
                      <Cardshoes 슈즈={shoes[i]} i={i} key={i} />
                    )
                  })
                }
              </div>
            </재고context.Provider>

            <button className='btn btn-primary' onClick={() => {
              // 로딩중이라는 UI 띄우기
              {
                lodingAlert == true
                  ? <div className='lodingAlert'><p>loding</p></div>
                  : null
              }
              // ajax get 요청
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

        {/* 세부(Detail) 페이지 */}
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            {/* 3️⃣ <Suspense> 라는 컴포넌트로 <Detail> 감싸기 */}
            {/* 4️⃣ fallback속성에 Detail 컴포넌트 로딩전까지 보여줄 HTML 적기 */}
            <Suspense fallback={<div>로딩중!</div>}> 
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </Suspense>
          </재고context.Provider>
        </Route>

        {/* 카트(Cart) 페이지 */}
        <Route path='/cart'>
          <Cart></Cart>
        </Route>
      </Switch>

    </div>
  );
}


function Cardshoes(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();
  return (
    // history를 이용하여 상세 페이지로 이동되게끔
    // props.i를 쓰면 상품을 정렬 했을 경우 문제가 발생 -> 따라서 상품의 고유 번호(id)로 하자.
    <div className='col-md-4' onClick={() => { history.push('/detail/' + props.슈즈.id) }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
      <h4>{props.슈즈.title}</h4>
      <p>{props.슈즈.content} & {props.슈즈.price}</p>
      <Test i={props.i}></Test>
    </div>
  )
}


// 컴포넌트 안에 컴포넌트 추가하기
function Test(props) {
  // useContext로 데이터를 받아서 사용
  let 재고 = useContext(재고context);
  return (
    <p> 재고 : {재고[props.i]}</p>
  )
}


export default App;


// ⭐ 성능향상과 유지관리를 위해
// 1️⃣ 함수나 오브젝트는 변수에 담아서 쓰자
// 의미없는 arrowfunction + object를 쓰지 말고
// 변수에 담아서 오브젝트를 쓰던가 함수를 따로 선언해서 쓰던가 하자
// 메모리 공간을 아낄 수 있음!
// function Cart(){
//   return (
//     <div style={ {color : 'red'} } ></div>
//   )
// }
// ▲ 이렇게 이름없는 콜백함수나 오브젝트를 대충 써넣지 말고

// var 스타일 = {color : 'red'};  // 재렌더링될 때 변수에 저장되지 않은 이름없는
                                  //object, function 류의 자료형들은 매번 새로운 메모리 영역을 할당해줘야 하기 때문에
                                  // 컴퓨터가 바빠질 수 있음. 따라서 컴포넌트 바깥에 마련해두는 것이 바람직하다.

// function Cart(){
//   return (
//     <div style={ 스타일 } ></div>
//   )
// }
// ▲ 이렇게 컴포넌트 바깥에 있는 변수에 저장해서 쓰라는 소리

// 2️⃣ 애니메이션 줄 때 레이아웃 변경 애니메이션은 좋지 않다.
// 레이아웃은 width, margin, padding, left right top bottom 이런 것들을 뜻하는데
// 자바스크립트나 transition을 이용해 레이아웃을 변경시키는건 브라우저 입장에서 큰 부담이 된다.
// (왜 그런지는 CSS 렌더링 단계 참고)
// 그래서 애니메이션을 넣어도 성능에 큰 지장이 없게 만들고 싶으면
// transform, opacity 같은 CSS 속성을 이용해 애니메이션 주는 것이 바람직


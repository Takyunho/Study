import "./App.css";
import { Button, Row, Col, Card } from "react-bootstrap"; // BootStrap 
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'; // router-dom 설치 후 Route 사용

import Image from 'react-random-image';   // 랜덤이미지

import data from './data.js'  // data.js에서 import
import NavBar from './components/NavBar.js';  // NavBar 가져오기
import Detail from './routes/Detail.js';  // Detail 가져오기
import Login from './routes/Login.js';  // Login 가져오기
import Register from './routes/Register'; // Register 가져오기
import Event from './routes/Event';   // Event 가져오기

function App() {
  
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();   // 페이지 이동기능을 만들고 싶을 때 사용하는 useNavigate() / Link대신 사용

  return (
    <div className="App">
      <Routes>
        {/* main Page */}
        {/* Route 사용시 하나의 div 또는 <>, </>로 감싸줘야 에러가 나지 않는다. */}
        <Route path="/" element={ 
          <>
            <NavBar></NavBar>
            <div className="main-bg"></div>   {/* main background */}
            <ProductItem shoes={shoes} />   {/* products */}
          </>
        }></Route>

        {/* detail Page */}
        <Route path="/detail/:id" element={
          <>
            <NavBar></NavBar>
            <Detail shoes={ shoes }></Detail>
          </>
        }></Route>

        {/* Login Page */}
        <Route path="/Login" element={ <><Login></Login></> } />

        {/* Register Page */}
        <Route path="/Register" element={ <><Register></Register></> }></Route>
      
        {/* Event Page */}
        <Route path='/event' element={
          <>
            <NavBar></NavBar>
            <Event></Event>
          </> }>        
          {/* 라우트 안에 라우트를 넣는 것을 nested routes 라고 한다.(서브 경로를 만들때 사용함) */}
          <Route path='one' element={ <><h2>첫 주문시 10,000원 할인!</h2></> }></Route> { /* 이 안에다가 컴포넌트 넣어도 된다. */}
          <Route path='two' element={ <><h2>첫 주문시 5,000원 할인!</h2></> }></Route>
        </Route>
      
      
        
        {/* 이상한 경로로 들어가면 404 보여주기 */}
        <Route path="*" element={
          <>
            <h1> 없는 페이지 </h1>
            <button onClick={() => { navigate(-1) }}>뒤로가기</button>
          </>
        }></Route>


      </Routes>
      
      


    </div>

  );
}


// 상품 컴포넌트
function ProductItem(props) {

  let navigate = useNavigate();

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {
          props.shoes.map((a, i) => (    // Array.from({ length: ?? })
          <Col>
            <Card className='card-container'>
              {/* <Card.Img variant="top" src="https://picsum.photos/200/300" /> */}
                <Image width={200} height={200} />
              <Card.Body>
                <Card.Title>{ props.shoes[a.id].title }</Card.Title>
                <Card.Text>
                  { props.shoes[a.id].content }
                    {props.shoes[a.id].price}
                    <Button className='detail-btn' variant="primary" onClick={() => { navigate('/detail/' + a.id)}}>detail</Button>
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default App;




/*
# 리액트에서 동적인 UI 만드는 step
1. html, css로 미리 디자인해놓기
2. UI의 현재 상태를 state에 저장하기
3. state에 따라서 UI가 어떻게 보일지 작성
*/

/*
# props로 부모 -> 자식 state 전송하는 법
1. 자식컴포넌트 사용하는 곳에서 <자식컴포넌트 작명={state이름} />
==> ex. <Modal modal={modal}
2. 자식컴포넌트 만드는 function으로 가서 props라는 파라미터 등록 후 props.작명 사용

@ (참고1) props는 <Modal 이런거={이런거}  저런거={저런거}> 이렇게 10개 100개 1000개 무한히 전송이 가능
@ (참고2) 꼭 state만 전송할 수 있는건 아닙니다.
<Modal 글제목={변수명}> //@ 일반 변수, 함수 전송도 가능하고 
<Modal 글제목="강남우동맛집"> //@ 일반 문자전송은 중괄호 없이 이렇게 해도 됩니다.
*/

/*
# react-router
# react-router-dom 설치
1. 터미널에 npm install react-router-dom@6 입력
2. index.js 파일에다가 import { BrowserRouter } from 'react-router-dom' 작성
3. <App />을 <BrowserRouter></BrowserRouter>로 감싸기
# 라우터로 페이지 나누기
1. App.js 상단에 여러가지 컴포넌트를 import 해온다.
- import { Routes, Route, Link } from 'react-router-dom'
2. <Routes>를 만들고 그 안에 <Route>를 작성
- <Routes>
    <Route />
    <Route />
    ...
  </Routes>
- 이때, <Route> 의 속성에다가 path="/url경로" element={ <보여줄html> } 이런거 작성하면 됨
- <Route path="/detail" element={ <div>상세페이지임</div> } /> 
*/
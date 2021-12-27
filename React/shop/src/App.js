/* eslint-disable */
import logo from './logo.svg';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';



// props 연속사용이 싫다면 Redux를 쓰든가 아니면 Context 어쩌구를 쓰든가 하시면 됩니다.
// 1. ⭐ context 만들기 (React.createContext(); )
// 2. ⭐ 만든 context 변수로 선언
export let 재고context = React.createContext();
// ⭐ 변수를 Detail.js에서 쓰고 싶으면
// App.js에서 export하고 Detail.js에서 import

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
          <div className='container'>

            {/* ⭐ 3. 같은 값을 공유할 HTML을 <범위>로 싸매기 */}
            {/* 범위.provider value={스테이트명}*/}
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
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </재고context.Provider>
        </Route>
      </Switch>

    </div>
  );
}


function Cardshoes(props) {

  // ⭐ state를 사용하고 싶으면 useContext() 라는 훅을 이용해서 사용을 원하는 context를 불러와야함.
  // useContext 훅을 쓰려면 상단에 'react' 로부터 import도 해야함
  let 재고 = useContext(재고context); // 재고context에 들어있는 state를 변수로 저장해 쓰겠습니다~ 라는 문법

  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
      <h4>{props.슈즈.title}</h4>
      <p>{props.슈즈.content} & {props.슈즈.price}</p>
      <p>{재고}</p>
    </div>
  )
}
// 컴포넌트 안에 컴포넌트 추가하기
function Test() {
  // useContext로 데이터를 받아서 사용
  let 재고 = useContext(재고context);
  return (
    <p> 재고 : {재고[0]}</p>
  )
}

export default App;



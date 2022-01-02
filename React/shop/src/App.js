/* eslint-disable */
import logo from './logo.svg';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';

// Cart.js import
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
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
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


// React에서 자주쓰는 if문 작성패턴

// 1️⃣ 컴포넌트 안에서 쓰는 if/else

// function Component() {
//   if ( true ) {
//     return <p>참이면 보여줄 HTML</p>;
//   } else {
//     return null;
//   }
// }

// 컴포넌트에서 JSX를 조건부로 보여주고 싶으면 위에처럼 씀
// 자바스크립트 if문은 return () 안의 JSX 내에서는 사용이 불가능
// 그래서 보통 return + JSX 전체를 출력하는 if문을 작성해서 사용한다.
//   그런데,
//   위의 컴포넌트는 else와 중괄호를 생략할 수 있음

//   function Component() {
//     if ( true ) {
//       return <p>참이면 보여줄 HTML</p>;
//     }
//     return null;
// }
  
// 왜냐면 자바스크립트 function 안에선 return 이라는 키워드를 만나면 return 밑에 있는
// 코드는 더이상 실행되지 않기 때문
// if -> else if -> else 이렇게 구성된 조건문도 if 두개로 축약가능


// 2️⃣ JSX안에서 쓰는 삼항연산자

// 영어로 ternary operator 라고 한다.
//   조건문 ? 조건문 참일때 실행할 코드: 거짓일 때 실행할 코드
// 이 형식에 맞춰 쓰면 끝

// function Component() {
//   return (
//     <div>
//       {
//         1 === 1
//         ? <p>참이면 보여줄 HTML</p>
//         : null
//       }
//     </div>
//   )
// }

// 그냥 JSX 내에서 if/else 대신 쓸 수 있다는게 장점
// 삼항연산자는 그냥 if와는 다르게 JSX 안에서도 실행가능하며 조건을 간단히 주고 싶을 때 사용
// 삼항연산자는 중첩 사용도 된다. 🔻

// function Component() {
//   return (
//     <div>
//       {
//         1 === 1
//         ? <p>참이면 보여줄 HTML</p>
//         : ( 2 === 2
//             ? <p>안녕</p>
//             : <p>반갑</p>
//           )
//       }
//     </div>
//   )
// }

// else 문 안에 if/else 문을 하나 추가 한 것
// 그러나 보기 안좋고 헷갈릴 수 있으므로
// 그냥 return문 바깥에서 if else 쓴 다음 그 결과를 변수로 저장해놓고
// 변수를 저기 집어넣든가 해서 사용하는 것이 낫다.


// 3️⃣ && 연산자로 if 역할 대신하기

// if문 쓸때
// '만약에 이 변수가 참이면 <p></p>를 이 자리에 뱉고 참이 아니면 null 뱉고'
// 이런 패턴이 자주 쓰임
// 이걸 && 를 써서 조금 더 쉽게 축약할 수 있음

// function Component() {
//   return (
//     <div>
//       {
//         1 === 1
//         ? <p>참이면 보여줄 HTML</p>
//         : null
//       }
//     </div>
//   )
// }

// function Component() {
//   return (
//     <div>
//       {
//         1 === 1 && <p>참이면 보여줄 HTML</p>
//       }
//     </div>
//   )
// }

// 위의 두 예제는 동일한 역할을 한다.
// 밑의 예제는 왼쪽 조건식이 true면 오른쪽 JSX가 그 자리에 남게된다.
// 왼쪽 조건식이 false면 false가 남는다.(false면 HTML로 렌더링하지 않음)


// (참고)
// 자바스크립트에서의 && 연산자 = 왼쪽 오른쪽 둘다 true면 전체를 true로 바꿔줘 라는 뜻

// true && false;  => false가 남음
// true && true;   => true가 남음

// 근데 자바스크립트에는 이상한 현상이 있다.
// && 기호로 비교할 때 true와 false를 넣는게 아니라 자료형을 넣으면,
  
// true && '안녕'; => '안녕'이 남음
// false && '안녕';  => false 가 남음

// 즉 && 기호를 중첩해서 여러개 쓸 때 false가 먼저오면 false값을 찾아주고 그게 아니면
// 마지막 값을 남겨줌


// 4️⃣ switch / case 조건문

// if문이 중첩해서 여러개 달려있는 경우에 사용

// function reducer(state, 액션){
  
//   if (액션.type === '수량증가'){
//     return 수량증가된state
//   } else if (액션.type === '수량감소'){
//     return 수량감소된state
//   } else {
//     return state
//   }
// }
// 이런식으로 썼었는데, (index.js의 reducer에서)
// 이걸 아래처럼 쓸 수 있음

// function reducer(state, 액션){
  
//   switch (액션.type) {
//     case '수량증가' :
//       return 수량증가된state;
//     case '수량감소' :
//       return 수량감소된state;
//     default :
//       return state
//   }

// }

// 🔺 switch는 어떻게 쓰냐면
// 1. switch (검사할변수명){} 이거부터 작성하고
// 2. 그 안에 case 검사할변수명이 이거랑 일치하냐 : 를 넣어줌.(이게 if문)
// 3. 그래서 이게 일치하면 case : 밑에 있는 코드를 실행
// 4. default : 는 그냥 맨 마지막에 쓰는 else문과 동일함

// 장점은 ... if문 연달아쓸 때 코드가 약간 줄어들 수 있음. (괄호도 줄고)


// 5️⃣ 오브젝트 자료형을 응용한 enum
// '경우에 따라서 다른 HTML을 보여주고 싶은 경우'
// if문 여러개 혹은 삼항연산자 여러개를 작성했는데,
// 이렇게 작성할 수도 있음

// 예를 들면 쇼핑몰에서 상품설명부분을 탭으로 만든다고 합시다.
// 그리고 경우에 따라서 상품정보 / 배송정보 / 환불약관 내용을 보여주고 싶은겁니다.

// 현재 state가 info면 <p>상품정보</p>
// 현재 state가 shipping이면 <p>배송정보</p>
// 현재 state가 refund면 <p>환불약관</p>

// 이런걸 보여주자는겁니다.
// state를 만들어놓고 if문으로 state를 검사하는 문법을 써야할 것 같지만
// 이번엔 if문이 아니라 자바스크립트 오브젝트자료형에 내가 보여주고 싶은 HTML을 다 담습니다.


// function Component() {
//   var 현재상태 = 'info';
//   return (
//     <div>
//       {
//         { 
//            info : <p>상품정보</p>,
//            shipping : <p>배송관련</p>,
//            refund : <p>환불약관</p>
//         }[현재상태]
//       }

//     </div>
//   )
// } 

// ▲ 원래 JSX는 저렇게 오브젝트에 담든, 어레이에 담든 아무 상관없습니다.
// 암튼 이렇게 object 자료형으로 HTML을 다 정리해서 담은 다음
// 마지막에 object{ } 뒤에[] 대괄호를 붙여서
// "key값이 현재상태인 자료를 뽑겠습니다" 라고 써놓는겁니다.
// 그럼 이제 현재상태라는 변수의 값에 따라서 원하는 HTML을 보여줄 수 있습니다. 
// 만약에 var 현재상태가 'info'면 info 항목에 저장된 <p>태그가 보여질 것이고
// 만약에 var 현재상태가 'refund'면 refund 항목에 저장된 <p>태그가 보여지겠죠? 

// 혹은 더욱 간지나게 오브젝트를 변수로 저장해놓고 쓰셔도 무방합니다.


// var 탭UI = { 
//   info : <p>상품정보</p>,
//   shipping : <p>배송관련</p>,
//   refund : <p>환불약관</p>
// }

// function Component() {
//   var 현재상태 = 'info';
//   return (
//     <div>
//       {
//         탭UI[현재상태]
//       }
//     </div>
//   )
// } 
// ▲ 뭔가 매우 깔끔해졌습니다.
// (예제에선 귀찮아서 state가 아니라 var 변수를 만들었습니다)
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


// state 변경함수 사용할 때 주의점 : async

/*
✅ 자바스크립트의 sync / async 관련 상식

자바스크립트는 일반적인 코드를 작성하면 synchonous(동기방식) 하게 처리된다.
무슨 소리냐면 코드 적은 순서대로 윗줄부터 차례로 코드가 실행된다는 뜻
실은 거의 모든 프로그래밍 언어들은 무조건 위에서부터 한줄한줄 실행됨

예를 들어,
console.log(1+1)
console.log(1+2)
console.log(1 + 3)

이런 코드는 그냥 위에서부터 한줄한줄 잘 실행됨
그래서 콘솔창에 2, 3, 4 순으로 출력

자바스크립트는 이상한 함수들을 사용하면 asynchronous(비동기적)하게 코드실행이 가능하다.
ajax, 이벤트리스너, setTimeout 이런 함수들을 쓸 때 그런 현상이 일어난다.
이런 함수들은 처리시간이 오래걸림
ajax를 예로 들면 인터넷 상황이 안좋으면 코드 실행이 오래 걸림. 10초도 걸릴 수 있음.
그래서 ajax 요청하는 코드들은 순차적으로 실행되지 않고 완료되면 실행됨

예를 들어,
console.log(1+1)
axios로 get요청하고나서 console.log(1+2) 실행해주셈~
console.log(1+3)

이런 코드는 2가 출력되고 4가 출력되고 그 다음에 3이 출력됨
3을 출력하는 코드가 asynchronous 처리를 지원하는 코드라 그런거
3을 출력할 때 오래걸리면 완료될 때 까지 잠깐 보류했다가
다른 코드를 먼저 실행시킨다는 소리 2 => 4 => 3
심지어 ajax요청이 0.00초 걸려도 4가 먼저, 그 다음 3이 출력
물리적으로 잠깐 처리가 보류되어서 그런거
자바스크립트라는 언어의 특징이자 장점이라고 볼 수 있다.

*/
/*
✅ 리액트의 setState 함수 특징 

리액트로 state 만들 땐 이렇게 합니다.

function App(){
  let [name, setName] = useState('kim');
}

그리고 이제 setName을 사용하면 name이라는 state를 자유롭게 변경할 수 있습니다.
setName('park') 이런 식으로 하면 변경된다는 겁니다.
근데 문제는 setName() 같은 state 변경함수들은
전부 asynchronous (비동기적) 으로 처리됩니다.
즉, setName()이 오래걸리면 이거 제껴두고 다른 밑에 있는 코드들부터 실행한다는 것입니다.
그래서 뭔가 예상치 못한 문제가 생길 수 있습니다.


🔻 예제 : 버튼을 누르면 2개 기능을 순차적으로 실행하고 싶습니다.

버튼을 누를 때마다

(1) count라는 state를 +1 해야합니다. (버튼누른 횟수 기록용)
(2) age라는 state도 +1 해야합니다. 
(3) 근데 count 가 3 이상이면 더 이상 age라는 state를 1 더하지 말도록 코드를 짜십시오.
버튼 3번 이상 누르면 (count가 3 이상이면) 나이를 그만더하라는 기능입니다.
그니까 22살에서 멈춰야합니다.


function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
        <div>안녕하십니까 전 {age}</div>
        <button onClick={() => {
          
          setCount(count + 1);
          if (count < 3) {
            setAge(age + 1);
          }
        
        }}>누르면한살먹기 </button>
          </div>
  )
}

1. 버튼을 누르면 count를 +1 해줍니다. 버튼누른 횟수 기록용이니까요.
2. 그리고 만약에 count라는게 3회보다 적으면 age를 +1 해줍니다.
끝입니다. 그러면 아마 count라는게 2일 때 까지 실행해주니까
age는 20에서 22가 되면 더이상 증가하지 않고 멈추겠군요. 

근데 23까지 증가하는데? 
뭔가 이상합니다. 
분명 count가 2일 때까지만 age를 +1 해주라고 했습니다.
count가 1일 때 age +1
count가 2일 때 age +1
count가 3이면 age +1 하지마 이런 코드니까요. 
근데 지금은 count가 3일 때도 age +1를 해주고 있는 듯 합니다. 
왜죠? 

이유는 위에서 말한 async라는 특징 때문에 그렇습니다. 
state 변경함수는 async 하게 처리되는 함수기 때문에
완료되기까지 시간이 오래걸리면 제쳐두고 다음 코드를 실행해줍니다.
그래서 코드를 해석해보자면 

① 버튼을 세번째 누르면 setCount(count+1); 이걸 실행해서 count를 3을 만들어줍니다.
② 근데 count를 3으로 만드는건 오래걸리니까 제껴두고 if ( count > 3 ) {} 이걸 실행합니다.
③ 이 때 count는 아직 2라서 if문 안의 setAge(age+1)이 잘 동작하고 있는겁니다.

이 모든 문제는 setCount()가 async 함수라서 그렇습니다. 
async함수는 오래걸리면 제껴두고 다음 줄 코드부터 실행하니까 그렇습니다.

그래서 저렇게 state1 변경하고나서 state2를 변경하는 코드를 작성할 땐 가끔 문제가 생깁니다.
이걸 정확히 sync스럽게, 순차적으로 실행하고 싶을 때 해결책은 useEffect입니다. 

App 컴포넌트안에 useEffect를 만들어봅니다.

useEffect(()=>{
    
 }, [count]) 


useEffect는 컴포넌트가 렌더링/재렌더링될 때 실행되는 함수랬습니다.
근데 뒤에다가 [] 대괄호안에 state를 집어넣으면
state가 변경되면 이 코드 실행해주세요~ 라는 뜻으로도 사용가능합니다.
그래서 이거 쓰시면 아까 말했던 문제를 해결할 수 있습니다. 

1. count라는 state가 변경되고나서 2. age도 변경해주세요~ 이런 식으로
순차적으로 코드를 실행할 수 있다는 것입니다.

① 그래서 일단 버튼을 이렇게 변경했습니다. 

<button onClick={()=>{

  setCount(count+1);

}}>누르면한살먹기</button> 

count라는 것만 +1 되게 바꿨습니다. 


② 그 다음에 나머지 age를 +1 하는 코드는 useEffect안에 개발해놨습니다.

useEffect(()=>{
  if ( count < 3 ) {
    setAge(age+1)
  }
 }, [count]) 
이런 식입니다.

그러면 useEffect는 count라는 state가 변경되고나서 실행이 되며
그럼 if문으로 count라는 state값을 제대로 의도대로 측정해볼 수 있는 겁니다.

③ 근데 문제는 useEffect 저렇게 써도 처음 페이지 로드될 때도 한번 실행이
되기 때문에 의도치 않은 버그가 발생할 수 있습니다. 
그래서 처음 페이지 로드시 useEffect 실행을 막는 코드를 알아서 검색해서 적용하셔도 되고
아니면 count라는 state를 또 활용하셔도 됩니다. 
count가 0일 때는 (페이지 처음 로드되었을 때는) 내부 코드를 동작시키지 않으면 될듯요

useEffect(()=>{
  if ( count != 0 && count < 3 ) {
    setAge(age+1)
  }
 }, [count])

이런 식입니다. count가 0이 아닐 때만 실행하라고 조건을 추가해줬습니다.
이제 버튼 누르면 22살까지만 잘 증가합니다.



*/
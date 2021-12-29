import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// let store = createStore(() => {
//   return [
//     { id: 0, name: '멋진신발', quan: 2 },
//     { id: 1, name: '예쁜신발', quan: 4 },
//     { id: 2, name: '좋은신발', quan: 7 }
//   ]
// })

// ⭐ redux에선 state 데이터의 수정방법을 미리 정의하고 수정해야한다.
// 1. reducer 함수를 만들고 그곳에 데이터 수정하는 방법을 정의해놓습니다.
// 2. 그리고 원하는 곳에서 dispatch() 라는 함수를 써서 reducer에게 수정해달라고 요청을 합니다.

// 따로 state 변수를 만들어 두고 이걸 reducer에 default 파라미터 문법으로 집어넣기
// default 파라미터 문법은 ES6 신문법으로, 기본으로 가질 파라미터를 부여할 수 있음
// 그냥 파라미터 선언할 때 = 등호로 입력하면 됨
let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '예쁜신발', quan: 4 },
  { id: 2, name: '좋은신발', quan: 7 }
]

// 데이터 수정하는 법은 reducer로 만드는데,
// 그냥 function 어쩌구로 시작하는 흔히 보이는 함수로 만들면됨.
// 대신 reducer는 function안에 1. state 초기값과 2. state 데이터 수정방법이 들어있음
function reducer(state = 초기값, 액션) {
  if (액션.type === '수량증가') { //(액션.type === 수정방법이름) 이런 식
    
    // state 수정
    let copy = [...state];
    copy[0].quan++;
    // 수정된 state 리턴 
    return copy

  } else if (액션.type === '수량감소'){
    
    let copy = [...state]
    copy[0].quan--;
    return copy    

  } else {
    // 기본 state (reducer는 항상 state를 뱉어야함)
    return state
  }
}

// 위에서 만든 reducer를 createStore()안에 넣음
let store = createStore(reducer);



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ⭐ redux 쓰는 이유
// 1. props 전송 없이도 모든 컴포넌트들이 state를 사용할 수 있게 만들어줌
// 2. state 데이터 관리가 용이하다.
//  - 데이터의 수정방법을 미리 정의해둘 수 있다는게 장점

// 지금 같은 소규모 사이트에선 전혀 필요가 없음
// 그러나 대규모 사이트들에서는 데이터를 한 눈에, 한 곳에 관리할 수 있어서 사용함

// 대규모 사이트들은 컴포넌트가 무수히 많은데, 무수히 많은 컴포넌트에서 장바구니 state를
// 수정하는 코드를 짜게 되었을 때, 중간에 state 하나에 이상한 값이 들어와서 버그가 생기면?
// 버그를 찾으려고 state 수정하기위해 컴포넌트를 다 뒤져야 함

// 근데 Redux를 만들어 state 수정하는 방법을 미리 정해놓으면
// redux 안의 reducer만 잘 들여다 보면 됨. (혹은 간혹가다 dispatch부분도)
// 그래서 사용함

// 그래서 리덕스를 쓰면 'state 관리가 용이하다'고 함
// 즉, 상태관리가 용이하다
// 서버의 데이터입출력 API 만드는 과정이랑 유사하다고 이해하면 됨
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '예쁜신발', quan: 4 },
]


function reducer(state = 초기값, 액션) {
  
  //  '항목추가' 라는 요청이 들어오면 카피본을 생성해서 전송받은 데이터를 push (array에 추가) 해주세요
  if ( 액션.type === '항목추가') { 
    let copy = [...state]
    copy.push(액션.payload); // 괄호안에는 버튼 누를 때 전송된 데이터가 들어가야함. 그것이 바로 액션.payload
    // 액션.payload // Detail 컴포넌트에서 보낸 데이터 받아 쓰기
    // 액션이라는 파라미터는 dispatch() 소괄호 안에 들어있던 모든게 들어있음.
    return copy

  } else if (액션.type === '수량증가') { 
    
    let copy = [...state];
    copy[0].quan++;
    return copy

  } else if (액션.type === '수량감소') {

    let copy = [...state]
    //  만약에 음수면 그러니까 0보다 작으면 0 리턴
    if (copy[0].quan > 0) {
      copy[0].quan--;
      return copy
    } else {
      copy[0].quan = 0;
      return copy
    }

  } else {
    return state
  }
}


let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  
  if (액션.type === '알림닫기') {
    state = false;
    return state
  } else {
    return state
  }
  
}

let store = createStore(combineReducers({reducer, reducer2}));




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
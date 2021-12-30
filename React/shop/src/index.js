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
  { id: 2, name: '좋은신발', quan: 7 }
]


function reducer(state = 초기값, 액션) {
  if (액션.type === '수량증가') { 

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

// ⭐ 리덕스를 이용해서 alert 상태 저장
// redux store에선 reducer를 하나 더 쓰면 된다.
// 즉, state + reducer 세트를 하나 더 만들어서 여기에 UI의 true/false 값을 저장!
// 그러나 Cart.js에서만 쓰이는 알림창을 굳이 리덕스에 저장할 필요 XX
// 리덕스에는 뽑아쓸 수 있으면서 공용적으로 쓰이는 state를 저장하는 것이 바람직
let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  
  if (액션.type === '알림닫기') {
    state = false;
    return state
  } else {
    return state
  }
  
}



// reducer를 더 만들었으면 combineReducers() 사용
// combineReducers() => 리듀서 여러개 합치는 문법
// combineReducers() 안에 모든 리듀서를 object 형식으로 쭉 담으면 끝 (상단에 import 필요)
let store = createStore(combineReducers({reducer, reducer2}));

// ⭐ 오늘의 교훈 ⭐
// 이런 식으로 redux를 쓰면 안된다.
// 이거 UI 하나 만드는데 굳이.. redux에 저장?
// redux가 있다고 해도 redux에 state 저장할지 말지는 선택임!!
// 내가 이 state 데이터를 다른 컴포넌트에서 쓸 일이 없다면
// 간단하게 useState()로 Cart 컴포넌트 안에서 만들어서 사용 하면 됨. 굳이 redux 쓸 필요 X
// 반면에, 많은 컴포넌트들이 공유하는 값은 redux store안에 보관!!!
// 그것이 코드의 양을 조금이라도 줄이는 길임.




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
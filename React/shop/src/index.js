import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

// redux 세팅하기(데이터들을 App.js 이런데가 아니라 redux를 이용해 보관하기 위해)
// 1️⃣ 터미널에 yarn add redux react-redux 설치((redux, react-redux 두개의 라이브러리))
// redux는 데이터를 엄격하게 관리하는 기능, react-redux는 리덕스를 리액트에서 쓸 수 있게 도와주는 기능을 제공
// 2️⃣ 설치 후 import { Provider }
import { Provider } from 'react-redux';

// 4️⃣ createStore() 함수를 위해 import 
import { createStore } from 'redux';

// 4️⃣ redux에서 state를 하나 만들려면 createStore() 함수를 써야함 (useState가 아님)
// import 해온 다음에 createStore(콜백함수) 로 사용
// redux 설치 후엔 state들을 store라는 명칭으로 부름
let store = createStore(() => {
  // 콜백함수 안에는 내가 원하는 state 초기값을 작성
  return [{ id: 0, name: '멋진신발', quan: 2 }, { id: 1, name: '예쁜신발', quan: 4 },
    {id: 2, name: '좋은신발', quan: 7}]
})


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 3️⃣ 내가 state값 공유를 원하는 컴포넌트를 <Provider>로 감싸기 */}
      <Provider store={store}> { /* 5️⃣ props처럼 등록*/}
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

// redux 쓰는 이유 : props 전송 없이도 모든 컴포넌트들이 state를 사용할 수 있게 만들어줌
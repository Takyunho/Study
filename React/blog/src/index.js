import React from 'react';  // react 라이브러리는 컴포넌트를 만드는 역할
import ReactDOM from 'react-dom'; // React를 <script> 태그로 불러온다면 ReactDOM 글로벌 영역에서 상위 레벨 API를 이용할 수 있습니다. npm과 ES6를 사용한다면 import ReactDOM from 'react-dom'로 쓸 수 있습니다.
// react-dom 라이브러리는 컴포넌트를 render하고 dom에 그려주는 역할(HTMLElement에 연결하는 역할)
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

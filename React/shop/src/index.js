import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 여러가지 페이지를 만들고 싶다면 라우터를 이용
// 1️⃣ 먼저 터미널에서 react-router-dom 이라는 공식 라이브러리를 설치
// 터미널을 열고 npm install react-router-dom@5 또는 yarn add react-router-dom@5
// 둘 중 하나 입력해서 설치 (yarn은 yarn이 설치되어 있어야 한다.)
// 2️⃣ 터미널에 react-router-dom 설치 후 index.js에서 라우터 세팅
import { BrowserRouter } from 'react-router-dom';
// 'react-router-dom'과 같이 ./가 없으면 라이브러리 이름이라고 생각하면 된다.

ReactDOM.render(
  <React.StrictMode>
    {/* 3️⃣ 위에서 import해온 BrowserRouter 컴포넌트 태그로 App을 감싸주면 됨 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// ❗ 참고
// BrowserRouter 말고도 HashRouter가 있다.
// HashRouter를 복붙하면 사이트 방문시 URL 맨 뒤에 /#/이 붙은채로 시작하고
// BrowserRouter를 복붙하면 사이트 방문시 # 그런거 없이 깔끔하게 시작

// ❗ HashRouter를 사용하는 이유는?
// 원래 브라우저 주소창에 어떤 페이지를 입력하면 서버에게 특정 페이지를 보여달라는 요청이
// 되는데, 현재 요청할 서버가 없고 리액트 자체에서 라우팅을 담당하고 있음
// 그래서 잘못하면 있지도 않은 페이지를 서버에 요청해서 404Page Not Found 이런 에러가 뜰 수
// 있음
// 실수로 서버에게 요청하지 않게 하려면 안전하게 #을 붙여야 함
// 그래서 HashRouter를 사용하는 거 ㅇㅇ

// ❗ 그럼 BrowserRouter는 안좋은건가?
// BrowserRouter를 쓰려면 서버에서 세팅만 잘해주면 됨
// "이런 경로로 들어오는 요청은 404 보내지 말구요~ 전부 리액트가 라우팅하게 해주세요~"
// "이 경로로 들어오는 요청은 그냥 리액트 메인페이지로 보내주세요~"
// 이런 식으로 API를 짜놓으면 됨
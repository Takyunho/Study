import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          안녕하세요
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// 1️⃣
// 리액트로 웹을 만들기 위해서 필요한 개발환경
// Node.js + VS Code
// 설치 후 터미널에
// npx create - react - app blog 으로 프로젝트 생성
// npx 어쩌구 이렇게 하시면 특정 라이브러리를 이용해 프로젝트를 하나 생성하실 수 있고
// blog라는건 우리의 프로젝트명 결정하는 부분입니다. 자유롭게 작명하실 수 있습니다. 

// ⭐ 코드 짜거나 npm으로 뭐 하기 전 폴더가 제대로 열려있는지 꼭 체크

// 2️⃣
// 코드 짠거 미리 보고 싶으면 터미널창에서
// npm start
// 안뜨면 localhost:3000 이라고 크롬 브라우저 열고 직접 입력

// 3️⃣
// Node.js를 설치한 이유
// create React App 라이브러리를 사용하기 위해
// create React App을 구글에 검색하면 자세히 나옴
// Node.js를 설치하면 npm이라는 툴 이용가능

// ⭐
// App.js는 메인페이지에 들어갈 HTML 짜는 곳
// 메인페이지는 public/index.html이 메인페이지임
// index.js에서 app.js에 있는 내용을 index.html에 넣도록 코드가 짜여져 있음

// ⭐
// node_modules : 라이브러리를 모아놓은 폴더
// public : static 파일 보관함(정적으로 바뀌지 않는 파일들)
// src : 소스코드 보관함
// package.json : 설치한 라이브러리들을 모아놓은 파일
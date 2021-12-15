/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState(0);

  function 제목바꾸기() {
    var 새로운어레이 = [...글제목];       // 글제목이라는 state의 복사본 만들어서 새로운 어레이에 저장
    새로운어레이[0] = '공용 코트 추천';   // 새로운어레이 0번째 데이터를 '여자 코트 추천'으로 변경
    글제목변경(새로운어레이);             // 글제목변경()함수 안에 넣어서 글제목 state 변경
  }

  function 오름차순정렬() {
    var sortArray = [...글제목];

    // sortArray라는 어레이에 sort 함수 적용해서 가나다순으로 정렬하는 기능 구현
    sortArray.sort(function (a, b) {
      if (a < b == true) {
        return -1;   // true면 음수가 나오고 음수를 리턴하면 b를 오른쪽으로
        // 음수는 -1 이던 -2 던 상관없음
      } else {
        return 1;
      }
    })

    글제목변경(sortArray)
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      <div className='list'>
        <h4> {글제목[0]} <span onClick={() => { 좋아요변경(좋아요 + 1) }}>👍</span> {좋아요} </h4>
        <button onClick={제목바꾸기}>제목바꾸기</button>
        <button onClick={오름차순정렬}>오름차순정렬</button>
        <p> 12월 13일 발행</p>
        <hr />
      </div>

      <div className='list'>
        <h4> {글제목[1]}</h4>
        <p> 12월 13일 발행</p>
        <hr />
      </div>

      <div className='list'>
        <h4> {글제목[2]}</h4>
        <p> 12월 13일 발행</p>
        <hr />
      </div>

      {/* Component 문법 */}
      <Modal></Modal>

    </div>
    // 리턴 안에는 하나의 div만 가능함.
    // 즉, 태그 2개를 평행하게 적을 수 없음
    // 하나의 div 안에 다른 div가 들어가는 식으로 묶어야함
    // 예를 들어
    // return(
    //   <div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // )
    // 이런식으로 return() 안엔 태그 하나만 들어갈 수 있음
    // 많은 div를 피하고 싶을때 사용하는 리액트 문법이 있음.
    // HTML을 줄여서 쓸 수 있는 방법 : 리액트의 component문법
  );
}

// 컴포넌트문법은 복잡한 HTML들을 한 단어로 치환할 때 사용하는 문법임
// 컴포넌트 만들때 유의 사항
// 1. 이름은 대문자로 시작해야 함 (소문자로하면 렌더링이 되지 않음)
// 2. 리턴 ()안에 있는건 태그 하나로 묶어야함 (html이 나란히 여러개로 등장 x 하나로 묶어야함)
// return() 내부를 묶을 때 의미없는 <div> 쓰기 싫으면
// <> ~~~ </> fragments 라는 문법 사용
// 3. component 위치는 function App(){} 이것과 보통 나란히 만들어줌
// component 안에 미리 만들어둔 component 집어넣기도 가능

function Modal() {    // 이름 짓기 => Modal()
  return (
    // 원하는 HTML 담기 (긴 html을 함수로 싸맬 수 있음)
    <div className='modal'>
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
    
  )
}

// 어떤 HTML들을 Component 만드는게 좋을까?
// 1. 사이트에 반복해서 출현하는 HTML 덩어리들을 Component로 만들면 좋음
// 2. 내용이 매우 자주 변경될 것 같은 HTML 부분을 잘라서 Component로 만들면 좋음
// 3. 다른 페이지를 만들고 싶다면 그 페이지의 HTML 내용을 하나의 컴포넌트로 만드는게 좋음
// ( 좋을 뿐 필수는 아님 )
// 4. 다른 팀원과 협업할 때 웹페이지를 컴포넌트 단위로 나눠서 작업을 분배하기도 함

// Component의 단점은?
// HTML 깔끔하게 하려고 함수 자체를 많이 만들면 그것 만으로도 관리가 힘들 수 있음
// 가장 큰 단점은, 예를 들어 위에서 <Modal>이라는 컴포넌트가 App(){}안에 있는
// state를 사용하고 싶을 때 그냥 바로 쓸 수 없다는 것
// 이때, props라는 문법을 이용해 state를 <Modal>까지 전해줘야 사용 가능

// 따라서 온갖거를 Component로 쪼개지 말고 꼭 필요한 곳만 컴포넌트로 쪼개자!


export default App;


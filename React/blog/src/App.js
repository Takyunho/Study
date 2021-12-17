/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // ⭐ state는 UI의 현재상태를 보관하는 저장소역할을 한다.
  let [글제목, 글제목변경] = useState(['남자 코트 추천', ' 여자 코트 추천', ' 남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, modal변경] = useState(false);

  // 중요한 정보는 일반 변수가 아니라 state로 만들기
  let [clickTitle, clickTitle변경] = useState(0);   // 몇번째 글제목 눌렀는지의 정보를 보관하는 곳이라고 생각하면 됨
  // input에 입력한 값 저장하는 공간 
  let [입력값, 입력값변경] = useState('');          // 초기값은 따옴표 두개로 빈 문자열

// 버튼 클릭시 글제목 바꾸기
  function 제목바꾸기() {
    var 새로운어레이 = [...글제목];       // 글제목이라는 state의 복사본 만들어서 새로운 어레이에 저장
    새로운어레이[0] = '공용 코트 추천';   // 새로운어레이 0번째 데이터를 '여자 코트 추천'으로 변경
    글제목변경(새로운어레이);             // 글제목변경()함수 안에 넣어서 글제목 state 변경
  }


// 버튼 클릭시 가나다순으로 정렬
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


// 좋아요버튼 클릭시 좋아요 카운트
  function 좋아요각각변경(i) {
    var 새로운좋아요 = [...좋아요];
    새로운좋아요[i] = 새로운좋아요[i] + 1;
    좋아요변경(새로운좋아요);
  }



  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
      {
        // 반복할때 map() 함수 사용
        글제목.map(function (a, i) {
          return (
            <div className='list' key={i}> {/* map반복문으로 돌린 HTML에는 key={}가 필요 (안하면 warning이 뜬다) */ }
              <h4 onClick={() => { clickTitle변경(i) } }> {a} <span onClick={() => {좋아요각각변경(i)}}>👍</span> {좋아요[i]}</h4>
              <p> 12월 13일 발행</p>
              <hr />
            </div>
          )
        })
      }

      {/* 사용자가 입력한 input 값을 state에 저장하는 법 */}
      {/* <input onChange={(e) => { 입력값변경(e.target.value) } }></input> */}
      {/* onChange라는건 input에 무언가 입력할 때마다 특정 함수를 동작시키고 싶을 때 사용 */}
      {/* e.target이라는건 쌩자바스크립트 문법으로 '지금 이벤트가 동작하는 HTML요소'
      .value라는건 input등에 입력한 값을 의미 */}
      < button onClick={() => { modal변경(!modal) }}>모달창 열고 닫기</button>
      {
        modal === true
          ? <Modal 글제목={글제목} clickTitle={ clickTitle }></Modal>
          : null
      }
      
    </div >
  );
}

// UI 만드는법
// 1. 지금 0,1,2번째 중 몇번째 제목을 눌렀는지 상태정보를 state로 저장해놓고
//  즉, state를 하나 만들고
// 2. state가 0일 때는 0번째 제목을 저기 출력해주고
// state가 1일 때는 1번째 제목을 저기 출력해주고..
// 이런식으로 UI 만들기


function Modal(props) {
  return (
    <div className='modal'>
      <h2>{ props.글제목[ props.clickTitle ] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;


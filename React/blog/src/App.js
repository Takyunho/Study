/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState(0);

  let [modal, modal변경] = useState(false);


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


  function 모달창열고닫기() {
    // 만약에 modal이 false 면
    if (modal == false) {
      // true로 바꿔
      modal변경(true);
    } else if (modal == true) {   // 그렇지 않고 Modal이 true면
      // false로 바꿔
      modal변경(false);
    }
  }
  // Q. 오잉 왜 state 변경할 때 복사본을 만들어서 수정하라매요?
  // A. 사본만드는건 reference 자료형들만 하시면 됩니다. array, object 이런거요.
  // 문자, 숫자, true/false 이런건 필요없이 직접수정하셈

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
        <button onClick={모달창열고닫기}>모달창 열고 닫기</button>
      </div>

      {/* if 대신 삼항연산자 사용가능*/}
      {/* 조건식 ? 조건식 참일 때 실행할 코드 : 조건식 거짓일 때 실행할 코드  */}
      {/* 스위치가 켜져있을 때(modal이 true일때)만 모달창이 보인다고 명시 */}
      {modal === true ?
        <Modal></Modal>
        : null
      }
      {/* 리액트에서 클릭시 보이는 UI 만드는 법 

1. 일단 UI가 보이는/보이지않는 상태정보를 state로 만들어둠 (보통 true/false 자료형으로)
2. state가 true일 때만 UI를 보여준다고 if문을 사용함 
3. <열기버튼>을 누르면 state가 true로 바뀌도록 버튼에 기능개발 */}

    </div>
  );
}


function Modal() {
  return (
    <div className='modal'>
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}


export default App;


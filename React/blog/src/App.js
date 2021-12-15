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

  // 일반 for 반복문을 써서 HTML 반복하고 싶으면 따로 함수를 만들어서 사용
  // 1. 따로 일반 함수를 만들고,
  // 2. 함수안에 HTML을 담을 array 생성
  // 3. 함수안에서 for 반복문을 이용해 array내에 HTMl을 추가
  // 4. 완성된 array를 return 해줌
  // 5. 그리고 함수를 원하는 곳에 { 함수명() } 데이터 바인딩
  function 반복된UI() {
    var 어레이 = [];

      for (var i = 0; i < 3; i++) {
        어레이.push(            //push = 추가해주세요~
        <div className='list'>
          <h4> {글제목[i]}</h4>
          <p> 12월 13일 발행</p>
          <hr />
        </div>
      );     
    }

    return 어레이
  }

// 위에서 <div> 들을 array에 담는 이유
  // 여러가지 HTML 들을 한 곳에 보관하고 싶으면 array 자료형에 보관하면 됨
  // 예를 들어 <div></div>를 3개 담고 싶으면
  // [ <div></div>, <div></div>, <div></div> ]
  // 이렇게 쭉 담아도 됨!
  // 이걸 원하는 곳에서 { 함수() } 해서 데이터바인딩 하면 div 3개가 연달아서 잘 보임
  // 리액트에서는 그냥 HTML들, 정확히 말하면 JSX들이 그냥 array에 담겨있어도 잘 렌더링
  // 해주므로 이렇게 쓸 수 있음


  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      {/* <div className='list'>
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
      </div> */}


      {/*
      HTML을 반복하고 싶으면
      { 반복할데이터.map() }
      */}
      {/* {
          // 반복할때 map() 함수 사용
          글제목.map(function (a) {  // 글제목이라는 어레이 개수만큼 반복 실행
            return (
              <div className='list'>
                <h4> {a} <span onClick={() => { 좋아요변경(좋아요 + 1) }}>👍</span> {좋아요}</h4>
                <p> 12월 13일 발행</p>
                <hr />
              </div>
            )
          })
        } */}

        {/* 함수로 만든 HTML 실행 */}
        { 반복된UI() }


        < button onClick={() => { modal변경(!modal) }}>모달창 열고 닫기</button>
      {
    modal === true
    ? <Modal></Modal>
    : null
  }
  {/* modal이 true면 false가 되고, modal이 false면 true가 됨 */ }
  {/* ! 느낌표 기호는 true 왼쪽에 붙이면 false로 바꿔주고
        false 왼쪽에 붙이면 true로 바꿔줌 */}
  {/* 즉, modal이라는 state에 !를 붙이면 지금 state를 반대로 만들어주므로
        열려 있으면 닫히고 닫혀있으면 열리게 됨 */}

    </div >
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


/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  // let [좋아요1, 좋아요변경1] = useState(0);
  // let [좋아요2, 좋아요변경2] = useState(0);
  // let [좋아요3, 좋아요변경3] = useState(0);

  let [좋아요, 좋아요변경] = useState([0, 0, 0]);

  let [modal, modal변경] = useState(false);

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
        // 파라미터
        // callback 함수 부분은 세가지 인수를 가질 수 있다. (새로운 배열의 요소를 생성하는.)
        // 1. currentValue 현재 처리되고 있는 value
        // 2. 현재 처리되고 있는 요소의 index 값
        // 3. array 메소드가 불려진 배열
        글제목.map(function (a, i) {  // 글제목이라는 어레이 개수만큼 반복 실행 / map함수의 콜백함수의 두번째 인자로 index값을 추적할 수 있게 변수 i를 선언
          return (
            <div className='list'>
              <h4> {a} <span onClick={() => {좋아요각각변경(i)}}>👍</span> {좋아요[i]}</h4>
              <p> 12월 13일 발행</p>
              <hr />
            </div>
          )
        })
        // 참고: anyway, map함수를 사용해서 key를 넘겨줄수 있다. (안하면 warning이 뜬다)
      }
    
      < button onClick={() => { modal변경(!modal) }}>모달창 열고 닫기</button>
      {
        modal === true
          ? <Modal></Modal>
          : null
      }

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


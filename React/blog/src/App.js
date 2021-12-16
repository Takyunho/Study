/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', ' 여자 코트 추천', ' 남자 바지 추천']);
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
        글제목.map(function (a, i) {
          return (
            <div className='list'>
              <h4> {a} <span onClick={() => {좋아요각각변경(i)}}>👍</span> {좋아요[i]}</h4>
              <p> 12월 13일 발행</p>
              <hr />
            </div>
          )
        })
      }
      
      < button onClick={() => { modal변경(!modal) }}>모달창 열고 닫기</button>
      {
        modal === true
          ? <Modal 글제목= {글제목}></Modal>
          : null
      }
      {/* 컴포넌트 안에 컴포넌트를 집어넣어서 사용할 수 있는데, 이때 안에 들어간 컴포
      넌트를 자식 컴포넌트라고 함 (여기선 Modal이 자식컴포넌트, App이 부모 컴포넌트) */}
      
      {/* <Modal> 이라는 자식 컴포넌트가 부모인 App이 가진 state를 사용하고 싶으면
      props문법 사용 */}
      {/* ⭐ props로 자식컴포넌트에게 state 전해주는 법
      1. <자식컴포넌트 작명={state명} />
      2. 자식컴포넌트 선언하는 fucntion 안에 파라미터 입력(보통은 props 라고 적음)
      3. props.작명 으로 사용  */}

      {/* ⭐ 참고
      1. props는 <Modal 작명={스테이트} 작명2={또다른스테이트} 등 이렇게 10개, 100개, 1000개
      무한히 전송 가능함
      2. props라는 파라미터엔 전송한 모든 props 데이터가 들어가 있음.
      props.글제목[0] 이런 식으로 원하는 것만 꺼내쓰면 됨
      3. props 전송할 땐 꼭 중괄호로 전송해야 되는건 아님
      <Modal 글제목={변수명}> 이렇게 변수명을 넣고싶으면 중괄호를 쓰고
      <Modal 글제목="강남우동맛집"> 이렇게 일반 텍스트를 전송하고 싶으면 따옴표 쓰면됨
      */}
    </div >
  );
}


function Modal(props) {
  return (
    <div className='modal'>
      <h2>{ props.글제목[0] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;


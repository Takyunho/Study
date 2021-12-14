/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState(0);

  // function 제목바꾸기() {
  //   글제목변경(['여자코트 추천', '여자 코트 추천', '남자 바지 추천'])
  // }
  function 제목바꾸기() {
    var 새로운어레이 = [...글제목];       // 글제목이라는 state의 복사본 만들어서 새로운 어레이에 저장
    새로운어레이[0] = '여자 코트 추천';   // 새로운어레이 0번째 데이터를 '여자 코트 추천'으로 변경
    글제목변경( 새로운어레이 );             // 글제목변경()함수 안에 넣어서 글제목 state 변경
  }
  // ❗ state도 등호 = 를 이용해서 복사하면 문제가 일어나기 때문에
  // 완전히 개별 복사본을 만들어주는 카피를 해야함(shallow/deep copy)
  // 예를 들어 var 새로운어레이 = [...원본어레이] 처럼

  // ... 은 spread 연산자라고하는 ES6 신문법임
  // array나 object 자료형 왼쪽에 붙일 수 있으며
  // 중괄호나 대괄호를 벗겨주세요~ 라는 뜻
  // ...[1,2,3]이렇게 쓰면 그 자리에 1,2,3이 남음 (걍 괄호 벗기기용 연산자)

  // 다른 용도로는 array나 object 자료형을 shallow/deep copy할 때 많이 사용

  // var data1 = [1,2,3];
  // var data2 = [...data1]

  // 그냥 data1에 있던 자료들을 괄호 벗긴담에 다시 array로 만들어주세요~ 라는 뜻인데
  // array를 이런 식으로 사용하면
  // 완전 독립적인 array 복사본을 생성해주는 copy가 가능
  // object 자료형도 똑같이 가능

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      <div className='list'>
        <h4> {글제목[0]} <span onClick={() => { 좋아요변경(좋아요 + 1) }}>👍</span> {좋아요} </h4>
        <button onClick={ 제목바꾸기 }>button</button>
        {/* state는 =등호기호로 직접 조작할 수 없음!!
        만들어놓은 state 변경함수를 꼭 사용해야함
        그리고 미리 정의된 함수를 넣을 때는 소괄호 X
        소괄호를 적으면 함수 바로 실행되기 때문
        
        ⭐ 즉,
        리액트에서 state를 수정하고 싶으면
        1. 수정하고 싶은 state의 deep/shallow 카피본을 하나 생성
        2. 카피본을 입맛에 맞게 수정
        3. 카피본을 state변경함수()에 집어넣기
        보통 이런 패턴으로 코드를 짬 
        */}
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
    </div>
  );
}

export default App;


import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  let [글제목, 글제목변경] = useState('남자 코트 추천');
  let [글제목2, 글제목변경2] = useState('여자 코트 추천');
  let [글제목3, 글제목변경3] = useState('남자 바지 추천');
  
  let [글제목어레이, 글제목어레이변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  
  // let posts = '강남 고기 맛집';

  
  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
    {/* 1분 21초 */}
      <div className='list'>
        <h4> { 글제목 }</h4>
        <h4> { 글제목어레이[0] }</h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>

      <div className='list'>
        <h4> { 글제목2 }</h4>
        <h4> { 글제목어레이[1] }</h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>

      <div className='list'>
        <h4> { 글제목3 }</h4>
        <h4> { 글제목어레이[2] }</h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;

  // 변수 대신에 쓰는 스테이트 만드는법
  // 1. 맨 윗줄 에 {useState} 첨부 (impot해서)
  // 2. useState(저장할 데이터); 추가

// 이떄, useState()를 쓰면 데이터가 두개 남음
// [데이터1, 데이터2] 이렇게 생긴 array가 남는데,
// 이걸 각각 a와 b라는 변수명으로 ES6 destructuring 문법을 이용해 저장해서 쓰면 됨
// a라는 변수엔 실제 저장할 데이터가 들어있고
// b라는 변수엔 저장할 데이터를 변경시킬 함수가 들어있음

// 여기서 destructuring 이란?
// array 안에 있는 데이터들을 변수로 쉽게 저장하고 싶으면 쓰는 ES6 신문법
// 예를 들어,

// var array = ['Kim', 20];

// var name = array[0];
// var age = array[1];

// 위처럼 구현하는 것이 아니라,

// var [name, age] = ['Kim', 20]

// 이렇게 등호여러번 쓸 필요 없이 왼쪽 오른쪽 형식을 똑같이 맞춰주면
// 자동으로 알아서 변수가 생성

// 즉, state는 
// 변수 대신 쓰는 데이터 저장공간을 의미하며, useState()를 이용해 만들어야함
// state 데이터도 {}를 이용해서 똑같이 변수처럼 데이터바인딩 가능

// 또한, 문자, 숫자, array, object 다 저장가능
// 예를 들어,
// let [글제목, 글제목변경] = useState(['남자 코트', '여자 코트'])라고 하면
// 글제목[0] 은 남자 코트 글제목[1]은 여자 코트가 출력됨

// ⭐ state에 데이터 저장해서 쓰는 이유
// "변수가 변경될 때 자동으로 관련된 HTML을 재렌더링되게 만들고 싶으면"
// 그럴 때 변수 말고 state에 저장해서 데이터바인딩

// 리액트는 state가 수정이 일어나면
// state가 포함된 HTML을 자동으로 재렌더링 해줌
// 즉
// 사용자가 버튼을 누르든 해서 글제목이라는 state가 '여자 코트 추천' 이런 식으로 변경되면
// <h3> 남자 코트 추천</h3> 이 부분을
// <h3> 여자 코트 추천</h3> 으로 새로고침 없이 샤샥 재렌더링해준다는 소리

// 그러나 블로그 로고명처럼 바뀌지 않는 데이터들은 state로 굳이 저장할 필요가 없음!
// state의 가장 큰 장점은 state가 변경될 때마다 자동으로 state와 관련된 HTML이 재렌더링이
// 된다는 것인데, 로고명은 아예 바뀔 일이 없으니 의미가 없음
// state는 상품명, 글제목, 가격 이런것처럼 자주 변하는 데이터들을 저장할 때 사용하는게 좋은 관습임!
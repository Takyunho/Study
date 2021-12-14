/* eslint-disable*/     
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천', '남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState(0);
  // 좋아요변경(대체할 데이터); 

  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
    
      <div className='list'>
        <h4> {글제목[0]} <span onClick={() => { 좋아요변경(좋아요 + 1) }}>👍</span> { 좋아요 } </h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>

      <div className='list'>
        <h4> { 글제목[1] }</h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>

      <div className='list'>
        <h4> { 글제목[2] }</h4>
        <p> 12월 13일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;



// 1. Click이 대문자인거
// 2. {} 중괄호 사용하는거
// 3. 그냥 코드가 아니라 함수를 적는거


// onClick안에 함수를 적는걸 예를 들자면

// onClick = {} 안에는 어디서 만든 함수명을 적거나 아니면 함수 하나를 바로 만들어서
// 집어넣어주시면 됩니다. 

// <div onClick={ showModal }>  (showModal은 어디 다른데 만들어둔 함수 이름)
// <div onClick={ function(){ 실행할 코드 } }>
// <div onClick={ () => { 실행할 코드 } }>
// ▲ 셋다 가능합니다.  
// (옛날 그 addEventListener() 여기에 콜백함수 집어넣는 것 처럼 하시면 됩니다.)

// 참고로 () => {} 이 코드는 function (){} 이것의 ES6 신버전 문법입니다. 
// 자바스크립트 신문법에선 function 대신 => 이라는 키워드를 이용할 수 있습니다.
//     (완전 똑같은 문법은 아니고 비슷합니다)


// state는 변수와는 다르게 값을 변경할 때 지정된 변경함수를 써야함
// let [ 따봉, 따봉변경 ] = useState(0); 
// 따봉변경이라고 만들어놓은 변수가 바로 따봉이라는 state를 변경하기 위한 함수입니다. 
// 사용법은 따봉변경( 대체할 데이터 ) 입니다. 
// 따봉변경 함수의 소괄호() 내에 있는 데이터로 완전히 대체해준다는게 포인트입니다. 
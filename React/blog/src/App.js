/* eslint-disable*/
// 터미널에 뜨는 warning 안뜨도록

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  // ⭐ state는 UI의 현재상태를 보관하는 저장소역할을 한다.
  let [글제목, 글제목변경] = useState(['남자 코트 추천', ' 여자 코트 추천', ' 남자 바지 추천']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, modal변경] = useState(false);
  let [clickTitle, clickTitle변경] = useState(0);
  let [입력값, 입력값변경] = useState('');


  // 좋아요버튼 클릭시 좋아요 카운트
  function 좋아요각각변경(i) {
    var 새로운좋아요 = [...좋아요];
    새로운좋아요[i] = 새로운좋아요[i] + 1;
    좋아요변경(새로운좋아요);
  }


  // 저장버튼 클릭시 글 발행하기
  function 글발행() {
    var 새로운글제목 = [...글제목];
    새로운글제목.unshift(입력값);   // unshift()는 array의 맨 앞에 자료를 하나 추가하고 싶을 때 씀
    글제목변경(새로운글제목);

    // 글 발행시 글제목state의 개수에 맞춰서 좋아요 state도 개수 추가
    var 새로운좋아요2 = [...좋아요];
    새로운좋아요2.unshift(0);
    좋아요변경(새로운좋아요2);
  }


  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      {
        글제목.map(function (a, i) {
          return (
            <div className='list' key={i}>
              <h4 onClick={() => { clickTitle변경(i) }}> {a} <span onClick={() => { 좋아요각각변경(i) }}>👍</span> {좋아요[i]}</h4>
              <p> 12월 13일 발행</p>
              <hr />
            </div>
          )
        })
      }

      
      <div className='publish'>
        <input onChange={(e) => { 입력값변경(e.target.value) }}></input>
        <button onClick={글발행}>저장</button>
      </div>


      < button onClick={() => { modal변경(!modal) }}>모달창 열고 닫기</button>
      {
        modal === true
          ? <Modal 글제목={글제목} clickTitle={clickTitle}></Modal>
          : null
      }


    </div >
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h2>{props.글제목[props.clickTitle]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}


export default App;
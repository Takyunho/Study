/*eslint-disable*/

import "./App.css";
import { useState } from "react";
import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';


function App() {
  // state는 변경이 일어나면 state가 포함된 html을 자동으로 재렌더링 해준다.
  let [postTitle, setPostTitle] = useState([
    "글제목 1",
    "글제목 2",
    "글제목 3",
  ]); // destructuring문법
  // console.log(postTitle);

  // 현재시간
  let DATE = new Date();
  // let [getMoment, setMoment] = useState(moment());
  // const nowTime = getMoment;

  let [goodCount, goodPlus] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  // modal창 안의 글제목 변경을 위한 state
  let [title, setTitle] = useState(0);
  let [inputVal, setInputVal] = useState('');


  // 제목정렬함수
  function sortTitle() {
    let postTitleSort = [...postTitle];
    postTitleSort.sort();
    setPostTitle(postTitleSort);
  }



  return (
    <div className="App">
      <div className="black-nav">
        <h4>Blog</h4>
        {/* <p>{JSON.stringify(currentDate)}</p> */}
        {/* Object데이터를 그대로 렌더링 하려고 하면 에러가 발생한다. */}
      </div>

      <div className="content-container">
        {/* 중괄호 필수 */}
        {
          postTitle.map(function (a, i) {
            return (
              <div className="content-item" key={i}>
                {/* <img src='https://a.cdn-hotels.com/gdcs/production47/d1059/04077388-e2a5-4952-88d6-4cd6ffe07710.jpg' alt='사진'></img> */}
                <div className="item">
                  <p><span onClick={() => {
                    let goodCountCopy = [...goodCount];
                    goodCountCopy[i] = goodCountCopy[i] + 1;
                    goodPlus(goodCountCopy);
                  }}>좋아요👍</span> {goodCount[i]}</p>
                  <h4 onClick={() => { setModal(!modal); setTitle(i) } }>{postTitle[i]}</h4>
                </div>
                <div className='btn'>
                  <button onClick={() => { 
                    let postTitleCopy = [...postTitle];
                    postTitleCopy[i] = "스테이트 바꾸기Test";
                    setPostTitle(postTitleCopy);
                  }}>수정하기</button>
                  <button onClick={() => { sortTitle() }}>정렬하기</button>
                  <button onClick={() => { 
                    let postTitleCopy = [...postTitle];
                    postTitleCopy.splice(i, 1);
                    setPostTitle(postTitleCopy);
                  }}>삭제하기</button>
                </div>
                
              </div>
            )
          })
        }
        <input onChange={(event) => {
          setInputVal(event.target.value);
          console.log(inputVal);
        }}></input>
        <button onClick={() => { 
          let postTitleCopy = [...postTitle];
          inputVal !== '' ? postTitleCopy.push(inputVal) : null;  // 글에 아무것도 입력안하고 글 추가하기 버튼 누르는거 막기
          setPostTitle(postTitleCopy);
          
          // 글을 하나 추가할 때마다 goodCount의 개수도 만들어주기
          let goodCountCopy = [...goodCount];
          goodCountCopy.push('0');
          goodPlus(goodCountCopy);

          // 작성시간 추가하기
          // let getMomentCopy = [...getMoment];
          // getMomentCopy = getMoment.format('YYYY년 MM월 DD일 HH:mm');
          // setMoment(getMomentCopy);

        }}>글 추가하기</button>
      </div>

      {/* JSX에서는 삼항 연산자를 사용해야 한다.  */}
      {modal == true ? <Modal postTitle={postTitle} color={'skyblue'} title={title} /> : null}

      
    </div>
  );
}


// 컴포넌트 만들기
let Modal = (props) => {
  return (
    <div className='modal' style={{background : props.color}}>
      <h4>{ props.postTitle[props.title] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )  
}

// 옛날 컴포넌트 만드는 문법
class Profile extends React.Component {
  constructor() {
    super();  // 먼저 써야 아래에서 state를 만들 수 있다.
    // 예전에는 constructor(){}안에다가 모든 state를 보관했다.
    this.state = { name: 'kim'}
  }

  render() {
    return (
      <div>프로필 컴포넌트</div>
    )
  }

}

export default App;



/*
# 리액트에서 동적인 UI 만드는 step
1. html, css로 미리 디자인해놓기
2. UI의 현재 상태를 state에 저장하기
3. state에 따라서 UI가 어떻게 보일지 작성
*/

/*
# props로 부모 -> 자식 state 전송하는 법
1. 자식컴포넌트 사용하는 곳에서 <자식컴포넌트 작명={state이름} />
==> ex. <Modal modal={modal}
2. 자식컴포넌트 만드는 function으로 가서 props라는 파라미터 등록 후 props.작명 사용

@ (참고1) props는 <Modal 이런거={이런거}  저런거={저런거}> 이렇게 10개 100개 1000개 무한히 전송이 가능
@ (참고2) 꼭 state만 전송할 수 있는건 아닙니다.
<Modal 글제목={변수명}> //@ 일반 변수, 함수 전송도 가능하고 
<Modal 글제목="강남우동맛집"> //@ 일반 문자전송은 중괄호 없이 이렇게 해도 됩니다.
*/

/*
# react-router
# react-router-dom 설치
1. 터미널에 npm install react-router-dom@6 입력
2. index.js 파일에다가 import { BrowserRouter } from 'react-router-dom' 작성
3. <App />을 <BrowserRouter></BrowserRouter>로 감싸기
*/
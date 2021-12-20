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

      {/* 리액트 예전 문법 */}
      {/* <Profile/> */}

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


// 리액트 예전 문법으로 component 만드는 법
// 1. class를 하나 만들고 이름짓습니다.
// 2. 그리고 React.Component라는 것을 extends한다고 써줍니다.
// 3. constructor(){} 함수를 언급해줍니다.
// 3. render(){} 함수 안에 원하는 HTML을 적습니다.
// 4. 원하는 곳에 <Profile /> 첨부하면 Component 만들기 끝

class Profile extends React.Component {
  // class: 변수/함수 보관하는 덩어리(여러개의 데이터나 함수를 한 곳에 보관하고 싶을 때 쓰는 문법)
  // extends : class 만들 때 오른쪽에 있는 놈의 성질을 몰려받아서 만들겠다는 소리
  // React.Component는 컴포넌트 성질을 갖고 있는 덩어리

  constructor() {
    // constructor()라는 부분은 변수와 함수가 가득한 class 덩어리를 만들 때, 새로운 변수를 넣는 공간이다.
    // 예전엔 constructor(){} 안에 모든 state를 보관
    super();
    // super()는 "extends 했던 React.Component 라는 덩어리에 있던 변수들을 그대로 물려받아 쓰겠습니다~"
    // 라는 뜻이고 꼭 먼저 써야 super() 밑에서 state를 만들 수 있다.

    // 예전 문법으로 state 만들고 쓰는 법
    // 1. state저장할 땐 constructor() 안에 this.state 라는 변수에 전부 보관해야 한다.
    // 2. 그리고 꺼내쓸 때는 this.state.state명 이렇게 쓰면 된다.
    this.state = { name: 'Kim', age: 30 }
  }

  // 모든 커스텀 함수는 constructor()와 render() 사이에 만들면 됨
  changeName() {    //버튼안에 있는 코드가 너무 길어서 함수로 빼고 싶어서 함수로 만듦
    this.setState({ name: 'Park' })
  }

  render() {
    return (
      <div>
        <h3> 저는 {this.state.name} 입니다.</h3>
        {/* <button onClick={() => { this.setState({ name: 'Park' }) }}>버튼</button> */}
        {/* 버튼을 누를 때 이름을 'Park'으로 변경하는 기능 */}
        {/* state를 변경할 땐 this.setState()라는 내장함수를 써야함 */}
        {/* 그리고 () 안에는 바꾸고 싶은 state 이름과 값만 적어주면 됨 */}
        <button onClick={this.changeName}>버튼</button>

      </div>
    )
  }
}

export default App;

  // ❗ 참고
  //  class를 만들어두시면 class가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있는 object를
  // 쉽게 만들 수 있습니다.
  // 혹은 class가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있는 class도
  // 쉽게 만들 수도 있고요. (extends 문법을 씁니다)
  // 암튼 가끔 그러고 싶을 때가 있어서 쓰는 문법인데 리액트는 왜 저러냐면
  // 1. 리액트 만든 사람들이 컴포넌트와 관련된 데이터/함수들을 보관하기 위해서
  // React.Component라는 class를 만들어두었고
  // 2. 그걸 extends 를 이용해서 복사하면 여러분만의 컴포넌트를 만들 수 있는거고
  // 3. 그리고 그렇게 하시면 여러분 컴포넌트는 리액트관련 데이터/함수를 자유롭게 쓸 수 있는겁니다.

  // ❗ 참고2
//   changeName() 만드는 것도 function 문법의 축약버전인데
// 자바스크립트에선 function을 쓴다면 안에있는 this값은 항상 새롭게 재정의됩니다.
// 그래서 changeName 안에 있던 this도 재정의가 되어서 의도와는 다른 기능을 하고 있는 것입니다. 

// 그래서 this가 재정의되지않게
// 1. 함수를 쓸 때 this.changeName.bind(this) 이렇게 사용하시거나
// 아니면 2. 함수를 아예 arrow function으로 바꿔주시면 됩니다.
// ex.
// changeName = () => {
//   this.setState( {name : 'Park'} )
// }

// ❗ arrow function 과 this 키워드의 관계
// 자바스크립트에선 () => {} (arrow function) 과 그냥 function(){} 은 거의 같은 의미입니다.
// 하지만 한가지 차이점이 있는데
// arrow function을 쓰시면 안에 있는 this값을 재정의해주지않습니다. 바깥에 있던 this의 값을 그대로 끌고와서 사용합니다.
// 하지만 function(){}을 쓰시면 this값이 새롭게 변화합니다.

// 같은 함수문법이지만 이런 차이가 있습니다.
// 그래서 arrow function은 내부의 this키워드 값을 변화시키지 않고 싶을 때 사용합니다.
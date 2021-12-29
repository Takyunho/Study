import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


function Cart(props) {
  return (
    <Table responsive="md">
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
        {
          props.작명.map(function (a, i) {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{props.작명[i].name}</td>
                <td>{props.작명[i].quan}</td>
                <td>수량변경</td>
              </tr>
            )
          })
        }

      </tbody>
    </Table>

  )
}
// ⭐ store에 있는 state 데이터 꺼내쓰는 법
// store 안에 있는 데이터를 props의 형태로 등록해야 사용 가능하다.

// 1️⃣ 데이터 사용을 원하는 컴포넌트.js 파일 밑에 function 만들기
// function state를props화(state){
//   return {
//     state : state
//   }
// }
// 이 함수는 store 안에 있던 state를 props로 만들어주는 역할을 한다.
// return 안에다가 {작명 : state}
// 이렇게 적으면 store 안에 있던 모든 state 데이터가 props로 등록됨
// 작명 이라는걸 출력해보면 아까 저장해뒀던 redux내의 state가 출력됨
// { 작명 : state.name }
// ▲ 아니면 이렇게 원하는 state만 쏙쏙 뽑아서 등록해도 됨.
function state를props로(store) {
  return {
    작명: store
  }
}

// 2️⃣ 그 다음 export default 부분을 connect() 어쩌구를 적음
// export default connect(state를props화)(Cart);
// connect 함수에 위에서 만든 함수를 집어 넣음(그냥 react-redux 라이브러리 사용법)
// Cart 컴포넌트도 함께 소괄호 안에 집어넣음
// 그럼 redux store에 있던 데이터들이 props로 엮인 채로 컴포넌트가 export 됨
export default connect(state를props로)(Cart);

// 3️⃣ 상단에 import도 해야함
// import { connect } from 'react-redux';


/*
⭐ 총정리
- redux는 props 전송 귀찮을 때 사용한다.
- 일단 redux를 설치부터 하고 세팅까지 완료한다.

세팅은

1. index.js에 <Provider>를 import 해온다.
2. state 값공유를 원하는 컴포넌트를 감싼다.
3. createStore를 import 해온 다음 사용법에 의해 state를 만들어
let store라는 변수에 저장한다.
4. <Provider store={store}> 이렇게 store를 등록하면
Provider로 감싼 컴포넌트는 전부 store안에 있던 값을 props없이 공유 할 수 있다.


store안에 있던 state 사용은 원하는 컴포넌트 파일로 가서

1. 하단에 function state를props화() 를 하나 만들어주고 state를 props로 등록한다.(store로 해도 되네?)
2. 그리고 또 하단에 export default connect(state를props화)(Cart); 
이렇게 사용하면 아까 만들어둔 state가 props로 등록이 된 것임.
props.state이름(작명한거) 이렇게 사용해서
저장된 state를 자유롭게 사용할 수 있음

세팅과정이 드러워서 그렇지
한번 세팅하고나면 세팅완료된 모든 컴포넌트는
redux내의 state를 자유자재로 사용가능함
*/


import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, memo } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import index from './index.js';

function Cart(props) {

  // useSelector 훅 사용하기
  let state = useSelector((작명) => 작명) // 작명.reducer 도 가능   // (작명) = redux에 있던 모든 state임
  // console.log(state);
  // console.log(state.reducer);

  let dispatch = useDispatch(); // 아래에서 props.dispacth 할 필요없이 dispatch라고 쓸 수 있음

  return (
    <div>
      <Table responsive="md">
        <thead>
          <tr>
            <th>상품넘버</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            state.reducer.map(function (a, i) {
              return (
                <tr key={i}>
                  <td>{a.id + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td>
                    <button onClick={() => { dispatch({ type: '수량증가', payload: a.id }) }}>+</button>
                    <button onClick={() => { dispatch({ type: '수량감소', payload: a.id }) }}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {
        state.reducer2 === true     // useSelector 사용함으로써 state안에 있던 reducer2에 있는거 받아오기
          ? <div className='alert-box'>
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => { dispatch({ type: '알림닫기' }) }}>닫기</button>
          </div>
          : null
      }

      <Parent 이름="yun" 나이="29" />
      {/* 컴포넌트에 있는 props나 state가 변경되면 그거 쓰는
      HTML(아래의 Child1,2)들이 전부 재 렌더링됨
      예를 들어 이름="yun1"로 변경하면 Child1,2 둘다 재 렌더링 됨(Child1만 되는게 아니라) */}
    </div>
  )
}


function Parent(props) {
  return (
    <div>
      <Child1 이름={ props.이름 }/>
      <Child2 나이={props.나이} /> 
    </div>
  )
}
function Child1() {
  useEffect(() => { console.log('렌더링됨1') });
  return <div>1111</div>
}

// ⭐ memo()를 사용하면 불필요한 재렌더링 막기 가능 
// memo() => props가 변경이 안된 컴포넌트는 재렌더링하지 말아주세요~ 라는 뜻의 함수 
// 컴포넌트가 너무 크거나 해서 잦은 재렌더링이 부담스러울 때 씀 
// 1. 'react'에서 import{memo}
// 2. memo()로 컴포넌트 감싸고 변수로 선언
// 3. 그럼 컴포넌트와 관련된 props가 변경이 될 때만 재렌더링이 된다. 
let Child2 = memo(function () {
  useEffect(() => { console.log('렌더링됨2') });
  return <div>2222</div>
});
// memo()의 단점
// 기존 props VS 바뀐 props 비교연산 후 컴포넌트를 업데이트 할지말지 결정하므로
// props가 크고 복잡하면 사이트가 느려짐
// 잘 판단해서 사용할 것!!
// 쓸지말지 평가하려면 리액트 개발자도구에서 렌더링속도를 측정해볼 순 있으나 
// 그것마저 귀찮으니 쪼그만한 사이트를 만들거나 컴포넌트 내부에 있는
// HTML 양이 매우 적을 경우엔 memo는 쓰지말도록 하자
// (컴포넌트 크기가 클때 사용하면 될거같음)


export default Cart;


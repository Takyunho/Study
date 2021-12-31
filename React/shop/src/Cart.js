import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import index from './index.js';

function Cart(props) {

  // ⭐ state 꺼내쓰는 더 쉬운 방법
  // useSelector 훅 사용하기
  let state = useSelector((작명) => 작명) // 작명.reducer 도 가능   // (작명) = redux에 있던 모든 state임
  // console.log(state);
  // console.log(state.reducer);

  // ⭐ dispatch를 더 쉽게 쓰는 방법
  let dispatch = useDispatch(); // 아래에서 props.dispacth 할 필요없이 dispatch라고 쓸 수 있음

  return (
    <div>
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
            state.reducer.map(function (a, i) {
              return (
                <tr key={i}>
                  <td>{a.id + 1}</td>
                  <td>{state.reducer[i].name}</td>
                  <td>{state.reducer[i].quan}</td>
                  <td>
                    {/* 위의 useDispatch() 함수를 통해 props 필요 없이 사용가능 */}
                    <button onClick={() => { dispatch({ type: '수량증가' }) }}>+</button>
                    <button onClick={() => { dispatch({ type: '수량감소' }) }}>-</button>
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


    </div>
  )
}

// 아래 문법 대신 위에서 useSelctor 사용
// function state를props로(store) {
//   return {
//     작명: store.reducer,
//     alert: store.reducer2 // reducer2에 있는거 가져오는법
//     // 리듀서가 여러개면 store에서 받아오는 데이터의 형식이 달라진다.
//   }
// }

// export default connect(state를props로)(Cart);

export default Cart;


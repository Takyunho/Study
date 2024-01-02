/* eslint-disable */
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

    </div>
  )
}


export default Cart;


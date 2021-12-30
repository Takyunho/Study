import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


function Cart(props) {
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
            props.작명.map(function (a, i) {
              return (
                <tr key={i}>
                  <td>{a.id + 1}</td>
                  <td>{props.작명[i].name}</td>
                  <td>{props.작명[i].quan}</td>
                  {/* 버튼을 누르면 '수량증가' 요청하기 */}
                  {/* ⭐ 데이터 수정요청을 할 땐 dispatch()함수 사용
                props.dispatch({ type : '???'}) / */}
                  <td>
                    <button onClick={() => { props.dispatch({ type: '수량증가' }) }}>+</button>
                    <button onClick={() => { props.dispatch({ type: '수량감소' }) }}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {
        props.alert === true
          ? <div className='alert-box'>
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={() => { props.dispatch({ type: '알림닫기' }) }}>닫기</button>
          </div>
          : null
      }


    </div>
  )
}

function state를props로(store) {
  return {
    작명: store.reducer,
    alert: store.reducer2 // reducer2에 있는거 가져오는법
    // 리듀서가 여러개면 store에서 받아오는 데이터의 형식이 달라진다.
  }
}

export default connect(state를props로)(Cart);


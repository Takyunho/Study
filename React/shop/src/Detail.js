/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import './Detail.scss'

let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${props => props.색상};
`;


function Detail(props) {
  
  let [alert, alert변경] = useState(true);      // ⭐ UI 만드는법 1️⃣ UI의 상태를 state로 저장(true/false)
  let [inputData, inputData변경] = useState('');// 컴포넌트 업데이트시 진짜 실행되는지 알아보기위해 input값을 저장하는 state

  // useEffect 훅
  useEffect(() => {
    
    // Detail페이지 방문 후 alert 창이 2초 후에 사라지도록
    let 타이머 = setTimeout(function () {
      alert변경(false);                     // alert 스테이트의 true값을 false로
      // ⭐ setTimeout 타이머를 썼으면 타이머 해제도 해야함(코드가 길어지거나 꼬이면 남아있는
      // 타이머 때문에 이상한 현상이 일어날 수 있음)
      // Detail컴포넌트가 사라질때 타이머를 제거하는 코드(버그를 막기위한 팁(타이머 해제 스킬))
      return () => { clearTimeout(타이머) } 
    }, 2000)

  // ⭐ useEffect는 업데이트될 때 항상 실행됨
  // 조건을 지정하면 업데이트마다 실행되는 것을 막을 수 있음
  }, [alert]); // alert라는 state가 변경이 될때만 실행해줌 (대괄호 안에 state는 콤마로 여러개 넣을 수 있음)
  // 이렇게 하면 1. Detail컴포넌트 로드가 될 때 & 2. alert라는 state가 변경이 될 때만 실행
  // 만약 빈칸이면?(조건을 안넣으면?)
  // 컴포넌트가 업데이트 될 때 절대 실행되지않음
  // 즉, 페이지 로드될때만 한 번 실행하고 끝남(컴포넌트 로드때만 한번 딱 실행하고 싶은 코드를 담을 때 쓸 수 있는 일종의 트릭)

  let { id } = useParams();
  let history = useHistory();

  let findProduct = props.shoes.find(function (product) {
    return product.id == id // 참인 데이터만 새로운 변수에 저장
  });
  console.log(findProduct);


  return (
    <div className="container">
      <박스>
        <제목 className='color'>Detail</제목>
      </박스>

      {/* Detail 컴포넌트 업데이트 시키기 위해 만듦(<input>에다가 뭔가 입력하면 Detail 컴포넌트가 재 렌더링됨(업데이트됨)) */}
      <input onChange={(e) => { inputData변경(e.target.value) }}></input>
      {inputData}


      {/* ⭐ UI만드는법 2️⃣ state가 true일때만 alert 보여주기 */}
      {
        alert === true
          ? <div className='alert-box'>
            <p>재고가 얼마 남지 않았습니다.</p>
          </div>
          : null
      }


      {/* <div className='alert-box2'>
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>
      <div className='alert-box3'>
        <p>재고가 얼마 남지 않았습니다.</p>
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${findProduct.id + 1}.jpg`} width="100%" />
          {/* <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`} width="100%" /> */}
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          <button className="btn btn-danger">주문하기</button>
          <button className="btn btn-danger" onClick={() => {
            history.goBack();
          }}>뒤로가기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;

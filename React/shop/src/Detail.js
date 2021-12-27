/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

// ⭐ 변수를 App.js에서 export하고 Detail.js에서 import
// export 키워드는 변수나 함수 선언 왼쪽에 붙일 수 있습니다.
// 그럼 다른 파일에서 import { 변수명, 함수명 } 이렇게 가져와서 쓸 수 있습니다. 
import { 재고context } from './App.js';

import './Detail.scss'

// styled-components
let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${props => props.색상};
`;
// styled-components 끝


function Detail(props) {
  
  let [alert, alert변경] = useState(true);
  
  // ⭐ 재고라는 state 쓰고 싶으면 App.js에서 import해와야함 
  // 변수를 App.js에서 export하고 Detail.js에서 import
  let 재고 = useContext(재고context);

  // useEffect 훅
  useEffect(() => {
    // Detail페이지 방문 후 alert 창이 2초 후에 사라지도록
    let 타이머 = setTimeout(function () {
      alert변경(false);
      return () => { clearTimeout(타이머) } 
    }, 2000)
  }, [alert]);
  // useEffect 훅 끝

  let { id } = useParams();
  let history = useHistory();

  let findProduct = props.shoes.find(function (product) {
    return product.id == id // 참인 데이터만 새로운 변수에 저장
  });
  console.log(findProduct);


  return (
    <div className="container">
      <박스>
        <제목 className='color'>상품</제목>
      </박스>

      {
        alert === true
          ? <div className='alert-box'>
            <p>재고가 얼마 남지 않았습니다.</p>
          </div>
          : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${findProduct.id + 1}.jpg`} width="100%" />
          {/* <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`} width="100%" /> */}
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          {/* 재고 표시하기 */}
          <Info 재고={props.재고} ></Info>
          {/* 주문하기 클릭시 재고 변경되도록 하기 */}
          <button className="btn btn-danger" onClick={() => { 
            var new재고 = [...props.재고]
            new재고[0] = new재고[0] - 1;
            props.재고변경(new재고);
          }}>주문하기</button>
          {/* 함수든 변수든 부모 컴포넌트가 가진걸 자식 컴포넌트가 사용하려면
          항상 props로 전송해서 쓸 수 있다.
          혹은 Context 문법 or redux를 사용하면 된다. */}
          <button className="btn btn-danger" onClick={() => {
            history.goBack();
          }}>뒤로가기</button>
        </div>
      </div>
    </div>
  )
}

function Info(props) {
  return (
    <p>남은 수량 : { props.재고[0] }</p>
  )
}


export default Detail;

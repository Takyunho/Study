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
  color : ${ props => props.색상 };
`; 


function Detail(props) {
  // useEffect 훅
  // 페이지 상단에 useEffect를 import 해온 후 사용
  useEffect(() => {
    // console.log(111)
    // Detail페이지 방문 후 alert 창이 2초 후에 사라지도록
    let 타이머 = setTimeout(function () {
      // 컴포넌트가 첫 등장해서 로딩이 끝난 후에 (전문용어로 mount 끝났을 때)
      document.querySelector('.alert-box').style.display = 'none';
    }, 2000)
    // 컴포넌트가 재렌더링 되고난 후 때 (전문용어로 update 되고난 후에)
      // return function 어쩌구(){ 언마운트될 때 실행할 코드~~~}
  });

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
      <div className='alert-box'>
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>
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
          <p>{findProduct.content }</p>
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


// 컴포넌트의 Lifecycle & Hook을 알아보자


// 여러분이 만들어쓰고있는 컴포넌트는 Lifecycle이라는 개념이 있습니다.
// 컴포넌트도 인생이 있다는겁니다.
// 컴포넌트는 1. 생성이 될 수도 있고 2. 삭제가 될 수 있고 3. 관련된 state가 변경되면
// 재렌더링(업데이트)가 일어날 수도 있습니다.


// Q. 그래서 이걸 왜 알아야하는데요?
// A. 컴포넌트의 인생 중간중간 Hook을 걸 수 있습니다. 그래서 배우는겁니다.
// Hook이 뭡니까. 갈고리죠?
// Hook을 이용해 인생중간중간에 참견을 할 수 있습니다.


// "Detail 컴포넌트 등장 전에 이것좀 해줘"
// "Detail 컴포넌트 사라지기 전에 이것좀 해줘"
// "Detail 컴포넌트 업데이트 되고나서 이것좀 해줘"
// Hook을 사용하면 이런 코드를 짤 수 있다는 것이지요.
// Hook의 정확한 명칭은 Lifecycle Hook 이라고 합니다.



// Lifecycle Hook은 어떻게 생겼는가 


// 위에서 설명한 Hook들은 원래 class로 만든 컴포넌트에서 사용가능합니다.

// ▼ 이런식으로 작성합니다.

// class Detail2 extends React.Component {
//   componentDidMount(){
//     // Detail2 컴포넌트가 Mount 되고나서 실행할 코드
//     // 컴포넌트 첫 등장 후 실행할 코드
//   }
//   componentWillUnmount(){
//     // Detail2 컴포넌트가 Unmount 되기전에 실행할 코드 
//     // 다른페이지로 넘어간다든지 등의 사유로 컴포넌트가 사라지기 전 실행할 코드
//   }
// }
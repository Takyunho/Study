/* eslint-disable */

import React, { useState } from 'react';        
import { useHistory, useParams } from 'react-router-dom'; 


function Detail(props) {
  
  let { id } = useParams();
  let history = useHistory(); 

   // 슈즈의 id를 찾아서 변수에 저장
  let findProduct = props.shoes.find(function (product) { // find() 함수 : Array 안에서 원하는 자료를 찾고싶을 때 사용
    return product.id == id 
    // product.id = 상품의 영구번호
    // id = 현재 URL의 /:id에 적힌 값
    // 즉, 상품의 영구번호가 현재 URL의 /:id에 적힌 값과 같은지 비교해서 참이면 변수에 저장
  });
  // 지금은 프론트엔드에서 모든 데이터를 다루고 있어서 어려운 + 반복문스러운 find() 함수를
  // 사용한 것이지만, 실제 개발할 땐 그냥 서버에 id: 0인 상품데이터를 Ajax로
  // 요청하는 경우가 많을겁니다.
  // 그럼 저렇게 find() 어쩌구를 쓰는게 아니라 ajax 요청하는 코드가 들어가있겠고
  // ajax 요청을 성공하면 {} 중괄호 안에 깔끔하게 상품데이터가 하나만 딱 들어올 것 같군요.
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          {/* 자료의 순서가 변경되면 상세페이지도 이상해져 버리므로,
          그걸 해결하기 위해
          0번째 상품의 제목을 보여달라고 하는 것이 아니라,
          상품의 영구번호가 0인 상품의 제목을 보여달라고 하자. */}
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

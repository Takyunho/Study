/* eslint-disable */

import React, { useState } from 'react';        
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
      <div className='alert-box2'>
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>
      <div className='alert-box3'>
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>

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


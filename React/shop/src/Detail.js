/* eslint-disable */

import React, { useState } from 'react';        
import { useHistory, useParams } from 'react-router-dom'; 
import styled from 'styled-components';

// 컴포넌트에 직접 스타일 넣어서 스타일링하기
// styled-components는 CSS를 미리 입혀놓은 컴포넌트를 만들어서 쓰는 것
// styled-components 라이브러리를 이용하면 컴포넌트를 만들 때 스타일을 미리 주입해서 만들 수 있음
let 박스 = styled.div`
  padding : 20px;
`;      // class 이런거 선언 필요없이 <컴포넌트>를 만들 수 있다.

// props로 스타일링
// 여러가지 비슷한 UI가 필요한 경우 사용함(예를 들면 h4요소가 여러가지 색깔 버전으로 필요한 경우)
let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 };
`; // 제목요소를 여러번 복붙하는 것 보다는 다양한 스타일이 필요한 곳에서 props 문법을 이용해 개발
// 그냥 ${ props.색상 } 이렇게 넣으면 안되고 콜백함수로 넣어야함


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
        <제목 색상="blue">Detail</제목>     {/* 위애 props로 미리 빵꾸를 뚫어 놓은 곳으로 blue가 들어감 */}
        <제목 색상={'red'}>Detail</제목>    {/* "blue"  == {'blue'} */}
      </박스>
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

// 컴포넌트가 많은 경우 스타일링을 하다보면 불편함이 생기는데
// 1. class 만들어놓은걸 까먹고 중복해서 또 만들거나
// 2. 갑자기 다른 이상한 컴포넌트에 원하지않는 스타일이 적용되거나
// 3. CSS 파일이 너무 길어져서 수정이 어렵거나
// 이런 경우가 있습니다.


// 그래서 컴포넌트 제작할 때 스타일을 바로 입혀서 컴포넌트를 만들어버릴 수도 있는데
// styled-components라는 인기 라이브러리를 설치하여 이용하시면 됩니다.
// 물론 호불호가 갈릴 수 있습니다.

// 1. 설치

// 터미널 열고
// yarn add styled-components 혹은
// npm install styled-components

// 2. import

// 사용하고 싶은 컴포넌트 맨위에
// import styled from 'styled-components' 작성

// 3. 사용


// styled-component의 최고 장점 = CSS를 막짜도 된다는 것
// 1. 스타일을 넣을 때 다른 파일이랑 컴포넌트 명이 겹쳐도 CSS적으로 전혀 문제가 생기지 않음
// 2. 그리고 나중에 컴포넌트 스타일 수정을 원할 때 CSS가 아니라 컴포넌트 파일을 찾으면 되니 수정도 편리함
// 그러나 굳이 사용할 필요는 없음

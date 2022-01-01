/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { 재고context } from './App.js';
import './Detail.scss'
// 부트스트랩
import { Nav } from 'react-bootstrap';
// 트랜지션 라이브러리 import
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import context from 'react-bootstrap/esm/AccordionContext';


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

  // 몇번째 버튼을 눌렀는지 저장할 state 데이터 만들기
  let [clickTab, clickTab변경] = useState(0);
  // 버튼 눌렀을 때 CSS 적용을 위한 state
  let [스위치, 스위치변경] = useState(false);


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
  // console.log(findProduct);


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
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>

          {/* 재고 표시하기 */}
          <Info 재고={재고} findProduct={findProduct}></Info>
          {/* {
            재고.map(function (a, i) {
              return (
                <Info 재고={재고[i]} i={i} key={i}></Info>
              )
            })
          } */}

          {/* 주문하기 클릭시 재고 변경되도록 하기 */}
          <button className="btn btn-danger" onClick={() => {
            var new재고 = [...props.재고]
            new재고[0] = new재고[0] - 1;
            props.재고변경(new재고);
            // 실제 주문하기 클릭한 상품을 reducer로 보내자
            props.dispatch({ type: '항목추가', payload: { id: findProduct.id, name: findProduct.title, quan: 1 } });
            


            history.push('/cart'); // 페이지 이동을 강제로 시켜주는 코드 (페이지 이동을 시켜서 값 리셋을 방지)
          }}>주문하기</button>
          <button className="btn btn-danger" onClick={() => {
            history.goBack();
          }}>뒤로가기</button>
        </div>
      </div>


      {/* 탭기능 만들기 */}
      <Nav variant="tabs" defaultActiveKey="link-0" className='mt-5'>
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => { 스위치변경(false); clickTab변경(0); }}>Option 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { 스위치변경(false); clickTab변경(1); }}>Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => { 스위치변경(false); clickTab변경(2); }}>Option 3</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* CSSTransition으로 애니메이션 필요한 곳 감싸기 */}
      <CSSTransition in={스위치} classNames='wow' timeout={500}>
        {/* in={true} 는 애니메이션 켜는 스위치 / timeout은 시간(밀리초) */}
        <TabContent 누른탭={clickTab} 스위치변경={스위치변경}></TabContent>
      </CSSTransition>
    </div>
  )
}



function Info(props) {

  return (
    <p>남은 수량 : {props.재고[0]}</p>
  )

}

// if문 사용(삼항연산자는 경우의 수가 3개 이상일때는 유용하지 않으므로)
function TabContent(props) {

  // 컴포넌트 등장 또는 업데이트시 스위치 true로 바꾸기
  useEffect(() => {
    props.스위치변경(true);     // 스위치변경은 상위 컴포넌트에 있으므로 props 이용
  })

  if (props.누른탭 === 0) {
    return <div>0번째 내용입니다.</div>    // 만약에 누른 state가 0이면 이거 보여줘
  } else if (props.누른탭 === 1) {
    return <div>1번째 내용입니다.</div>    // 1이면
  } else if (props.누른탭 === 2) {
    return <div>2번째 내용입니다.</div>    // 2면
  }
}



// redux에 있던 state를 갖다 쓰기 위해 컴포넌트 파일 하단에 이렇게 써야함
// connect 함수도 위에서 import 해야함
function state를props로(store) {
  return {
    작명: store.reducer,
    alert: store.reducer2
  }
}

export default connect(state를props로)(Detail);


// ⭐
// 1. src 폴더 내에 Detail.js 파일을 만들고
// 2. 컴포넌트 생성하는 코드를 담음.
// 근데 이거 쓰려면 맨 위에 항상 import React를 해와야함
// 3. 맨 마지막줄에 Detail 이라는 함수를 export

// 파일명은 아무렇게나 해도 상관 없으나,
// 보통은 컴포넌트파일들은 대문자로 시작함
// 그리고 컴포넌트명으로 이름짓는것이 관습


import React, { useState } from 'react';        // 꼭 첨부해야 컴포넌트 만들 수 있음
import { useHistory } from 'react-router-dom';  // useHistory라는 훅을 사용하기 위해 import


// 모듈화(컴포넌트를 다른 파일로 빼내는 방법)
function Detail() {
  
  // ⭐ useHistory라는 훅을 사용하기
  let history = useHistory(); 
  // useHistory()는 우리의 코딩을 편하게 해주는 일종의 Hook이다. (useState 이런거랑 비슷)
  // history라는 변수엔 큰 object{} 자료가 하나 저장된다.
  // 그 object 안에는 페이지 이동 내역 + 유용한 함수가 저장되어 있다.


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
          {/* ⭐ 페이지 이동기능 만들기 */}
          {/*
          Link태그 말고도 페이지 중간에 이동하고 싶은 경우가 있음
          이럴때 페이지 이동 함수를 사용
          그러기 위해 1. useHistory()라는 함수를 'react-router-dom'에서 import 해오고
          2. let history 라는 변수에 그 함수를 저장하면 됨 (변수명은 아무렇게나 작명가능)
          */}
          <button className="btn btn-danger" onClick={() => {
            // history에 저장된 여러 자료들 중 하나인 goBack()함수를 사용해서 뒤로가기 구현
            // goBack()같은 함수 즉, 라이브러리 사용법은 찾아서 읽거나 검색해봐야 알 수있으니 구글검색 ㄱㄱ
            history.goBack();
            // 커스텀 페이지로 이동하고 싶을때는?
            // 라이브러리 사용법에 따라 push() 함수를 꺼내쓰면 된다.
            // history.push('/') => / 경로로 이동해주세요~ 라는 뜻
          }}>뒤로가기</button>
        </div>
      </div>
    </div>
  )
}

// 변수명 뿐만 아니라, 함수명도 적어줄 수 있음
export default Detail;
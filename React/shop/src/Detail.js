
import React, { useState } from 'react';        
import { useHistory, useParams } from 'react-router-dom'; 


function Detail(props) {
  
  // 1. 맨 위에서 import를 이용해 useParams를 가져왔고 2. 그걸 변수에 저장
  let { id } = useParams();
  // useParams() 라는 함수는 현재 URL에 적힌 모든 파라미터를 {파라미터1,파라미터2} 이런 식으로
  // 저장해주는 고마운 함수
  // destructuring 문법을 이용해서 따로따로 변수로 빼서 저장
  // 그래서 id라는 변수는 :id 자리에 있던 숫자를 의미
  // 즉 /detail/1로 접속하면 id는 1이 되고, /detail/100 으로 접속하면 id라는 변수는 100이 됨

  let history = useHistory(); 


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{ props.shoes[id].content }</p>
          <p>{props.shoes[id].price}원</p>
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


// ⭐ 참고
// Q.그냥 애초에 shoes라는 state같은걸 Detail 컴포넌트에다가 만들면 되는거 아닙니까 ?
// 그럼 props 귀찮게 안써도 될텐데
// A. 좋은 방법입니다. 근데 React, Angular, Vue 이런거 쓸 때 항상 염두에 두셔야하는게
// 데이터는 항상 위에서 아래로 흘러야합니다.


// 만약에 그냥 <Detail>안에 state를 만들었다고 칩시다.
// 그리고 <App>안에 <Detail> & <Detail2> 컴포넌트가 있다고 칩시다.
// 그럼 <Detail2>에서 <Detail>안에 있는 state가 필요하면 어떡합니까?
// <App>으로 state를 올려보냈다가 다시 <Detail2>로 props로 전송하나요? 
// 딱봐도 귀찮고 어렵습니다.  

// 그래서 상위컴포넌트가 중요 데이터를 다 가지고 있어야합니다.
// 그리고 하위컴포넌트는 데이터를 항상 props로 받아서 써야합니다.
// 이것이 좋은 관습입니다.
// 왜냐면 안그러면 데이터를 역방향으로 전달시킨다면 props보다 훨씬 귀찮은 문제들이 생기니까요.
import React from 'react';
import styled, { css } from "styled-components";

//* Styled components
const Container = styled.div`
  // 여기서 스타일 작성
  background-color: #333;
  border: 1px solid #333;
  display: flex;
  margin: 0 auto;
  width: 100%;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #3c5b69;
  color: #b9eaff;
  margin: 0 1em;
  padding: 0.25em 1em;

  //^ 여기서 props를 사용할 수 있다. props는 컴포넌트의 속성으로 지정한 값이다.
  //^ 백틱안에 감싸져 있으니까 $와 중괄호를 이용해 화살표 함수를 사용하고, return 시킨다.
  ${(props) =>
    //@ Button 컴포넌트에 primary라는 속성이 있으면 아래의 css를 적용한다. (css는 import 필요)
    props.$primary &&
    css`
      background: #009cd5;
      color: white;
    `}
`;

export default function StyledComponent() {
  return (
    <div>
      <Container>
        <Button>normal</Button>
        <Button $primary="true">속성을 주면 props로 전달된다아</Button>
      </Container>
    </div>
  );
}


//@ 6.4 Styled Components
// create react-app에 설치되어 있지 않으므로, 따로 설치해 줘야 함
// yarn add styled-components / npm install styled-components
import './App.css';
import Button1 from './components/Button1';
import Button2 from './components/Button2';
import styled, {css} from 'styled-components';


//* Styled components
const Container = styled.div`
  // 여기서 스타일 작성
  background-color: #333;
  border: 1px solid #333;
  display: flex;
  margin: 0 auto;
  width: 100%;
`
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
    `
  }
`


export default function App() {
  return (
    <>
      <Button1 />
      <Button2 />
      <Container>
        <Button>normal</Button>
        <Button $primary="true">속성을 주면 props로 전달된다아</Button>
      </Container>
    </>
  );
}

//@ 6.3 PostCSS

// css를 import해와서 사용하는 경우에 이름이 같은 선택자가 있으면 마지막에 import된 css만 적용된다.
// 따라서 css를 import해오는 경우에는 BEM 방법론을 사용하면서 css 파일의 이름을 다르게 해야한다.
// 그러나 컴포넌트 개수가 많아지고 코드가 길어질수록 css 파일의 이름을 다르게 하는 것이 번거로워진다.
// 이를 해결하기 위한것이 PostCSS!!
// 사용법
//=> 1. css확장자 파일 앞에 module을 붙인다. ex) Button1.module.css
//=> 2. 컴포넌트에서 import 해온다. 이때 import한 이름은 아무거나 작성해도 된다. ex) import styles from './Button1.module.css';
//=> 3. 객체형태로 가져오기 때문에 className을 작성할 때 styles. 과 같이 객체 표기법으로 사용한다. ex) <button className={styles.button}>Button1</button>


//@ 6.4 Styled Components
// create react-app에 설치되어 있지 않으므로, 따로 설치해 줘야 함
// yarn add styled-components / npm install styled-components



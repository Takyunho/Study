import logo from './logo.svg';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// React Bootstrap에서 코드 가져올때 내가 쓸 컴포넌트 들을 import해야함
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">tyh shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="lh-lg mt-2 background">
        <h1>Hello, world!</h1>
        <p>dasdasdasdasdasas</p>
        <p>
          <Button variant="primary">Primary</Button>{' '}
        </p>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' width='100%'></img>
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
          <div className='col-md-4'>
          <img src='https://codingapple1.github.io/shop/shoes2.jpg' width='100%'></img>
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
          <div className='col-md-4'>
          <img src='https://codingapple1.github.io/shop/shoes3.jpg' width='100%'></img>
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
        </div>
      </div>



      
    </div>
  );
}

export default App;


// (참고)
// src 폴더에 있는 파일들은 리액트 앱을 발행했을 때 저절로 압축이 되고 파일명이 변경되는데
// public 폴더에 있는 파일은 리액트 앱을 발행했을 때 사이트 루트경로에 그대로 남아있습니다.
// 그래서 / 이렇게 경로를 입력해도 잘 먹습니다.
// 그래서 public 폴더에 있는 이미지들은 <img src="/image.jpg" /> 이렇게 쓰셔도 첨부가능합니다.
// ★ 리액트 17버전 이상에선 public 폴더안에 있는 이미지를 CSS파일에서는
// / image.jpg 이렇게 첨부할 수 없습니다.CSS파일에 작성할 이미지들은 src폴더 쓰셈

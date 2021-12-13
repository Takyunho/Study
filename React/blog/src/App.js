import logo from './logo.svg';
import './App.css';

function App() {

  let posts = '서버에서 받아온 데이터라고 가정'
  function 함수() {
    return 100
  }
  let 변수에저장해서사용 = {color : 'red', fontSize : '40px'}
  
  return (
    // 그냥 평소에 웹 만들던 것 처럼 여기에 HTML 코딩( JSX라는 문법)
    // 자바스크립트 파일 안에서 HTML을 직관적으로 작성하기 위해 도와주는
    // 리액트 기본 내장 문법이라고 생각하면 된다.
    // JSX도 일종의 자바스크립트기 때문에 자바스크립트에서 사용 하는 예약어인 class라는
    // 키워드를 막 사용하면 안됨.
    // className 이라고 써야 CSS파일의 class명을 박아넣을 수 있음
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
      {/* 리액트를 사용하면 데이터 바인딩이 쉬워진다.
      중괄호안에 데이터 바인딩 하고 싶은  변수명만 담으면 됨
      변수명 뿐만 아니라 미리 만들어둔 함수명이든 뭐든 별걸 다 집어넣을 수 있음 
      그리고 href, id, className, src 등 여러가지 HTML 속성들에도 데이터 바인딩이 가능 */}
      <h4> {posts}</h4>
      <img src={ logo }></img>
      <h4>{ 함수() }</h4>


      {/* HTML에 스타일을 직접 넣고 싶으면
      JSX 상에서는 무조건 {}오브젝트로 바꿔서 넣어야함 { 속성명 : '속성값' }
      그런데 속성명에 -(대쉬)기호를 쓸 수 없음 
      따라서 대쉬기호 대신에 모든 단어를 붙여써야함. 대신 붙여쓸 때 앞글자를
      대문자로 치환해서 사용!! (복잡해보이고 보기 싫으니까 변수로 따로 저장해서 사용 하거나
      CSS파일에 class를 만들어 사용하자) */}
      <h1 style={{ color: 'blue', fontSize: '30px' }}> {posts}</h1>
      <h1 style={ 변수에저장해서사용 }> {posts}</h1>
      
    </div>
  );
}

export default App;


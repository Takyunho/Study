import './App.css';

function App() {
  const list = ['딸기', '바나나', '우유', '초코']  
  
  return (
    <>
      <h1>Hello React!</h1>
      <ul>
        {
          // 1.
          list.map(item => <li>{item}</li>)
          // 2.
          // list.map(item => (
          //   <li>{item}</li>
          // ))
          // 3.
          // list.map((item) => {
          //   return <li>{item}</li>;
          // })
          // 4.
          // list.map(function (item) {
          //   return <li>{item}</li>;
          // })
        }
      </ul>
    </>
  );
}

export default App;

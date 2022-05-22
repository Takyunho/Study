// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {

  const [amount, setAmount] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const onChange = (event) => {
    setAmount(event.target.value);
  }

  const reset = () => setAmount(0) ;
  const onFlip = () => {
    reset();
    setFlipped((current) => !current)
  } // @ current는 현재 값을 받아서 그 반대의 값을 내놓는다.
  

  return (
    <div className="App">
      <h1>Super Converter</h1>
      <div>
        <label htmlFor='minutes'>Minutes</label>
        <input
          value={flipped ? amount * 60 : amount}
          placeholder='Minutes'
          type="number"
          id='minutes'
          className='minutes'
          onChange={onChange}
          // disabled={flipped === true}          
          disabled={flipped} // disabled 가 있으면 입력 X (즉, disabled가 true면 입력 못함)    
        />
      </div>
      <div>
        <label htmlFor='hours'>Hours</label>
        <input
          value={flipped ? amount : Math.round(amount / 60)}
          placeholder='Hours'
          type="number"
          id='hours'
          className='hours'
          // disabled={ flipped === false}
          disabled={!flipped} // 처음에 true
          onChange={ onChange }
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onFlip}>Flip</button>
    </div>
  );
}

export default App;

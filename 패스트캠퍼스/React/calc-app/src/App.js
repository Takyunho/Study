import { Component } from 'react';
import "./App.css";   // CSS 파일을 import 해야 app.css에서 작성한 스타일이 적용된다.
import ExpenseForm from './components/ExpenseForm';  // ExpenseForm 컴포넌트를 import 한다.
import ExpenseList from './components/ExpenseList';  // ExpenseList 컴포넌트를 import 한다.

class App extends Component {
  render() {
    return (
      <main className='main-container'>
        <h1>예산 계산기</h1>

        <div style={{ width: '100%', background: 'white', padding: '1rem' }}>
          {/* Expense Form */}
          <ExpenseForm />
        </div>

        <div style={{ width: '100%', background: 'white', padding: '1rem' }}>
          {/* Expense List */}
          <ExpenseList />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={ {fontSize: '2rem' }}>총 지출 : <span>원</span></p>

        </div>

      </main>
    )
  }
}


export default App;
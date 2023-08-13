import { Component } from 'react';
import "./App.css";   // CSS 파일을 import 해야 app.css에서 작성한 스타일이 적용된다.
import ExpenseForm from './components/ExpenseForm';  // ExpenseForm 컴포넌트를 import 한다.
import ExpenseList from './components/ExpenseList';  // ExpenseList 컴포넌트를 import 한다.

class App extends Component {

  initialExpense = [
    { id: 1, charge: '렌트비', amount: 1010 },
    { id: 2, charge: '교통비', amount: 2400 },
    { id: 3, charge: '식비', amount: 3600 },
  ]

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
          {/* props로 데이터 전달하기 */}
          <ExpenseList initialExpense={this.initialExpense} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={ {fontSize: '2rem' }}>총 지출 : <span>원</span></p>

        </div>

      </main>
    )
  }
}


export default App;
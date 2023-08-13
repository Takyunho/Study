import React, { Component } from 'react'
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"
import { MdDelete } from 'react-icons/md'

export class ExpenseList extends Component {
  render() {
    return (
      // div로 감싸는게 싫다면 <React.Fragment>로 감싸면 된다.
      // 또는 그냥 <></>로 감싸도 된다.
      <React.Fragment>
        <ul className='list'>
          {/* map 메소드를 이용해 자식 컴포넌트에 각각의 요소 전달하기 */}
          {this.props.initialExpense.map(expense => {
            return <ExpenseItem expense={expense} key={expense.id}></ExpenseItem>
          })}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button className='btn'>
            목록 지우기
            <MdDelete className='btn-icon'></MdDelete>
          </button>
        </div>

      </React.Fragment>

    )
  }
}

export default ExpenseList
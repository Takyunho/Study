import React, { Component } from 'react'
import "./ExpenseItem.css"
import { MdDelete, MdEdit } from "react-icons/md";

export class ExpenseItem extends Component {
  render() {
    return (
      <>
        <li className='item'>
          <div className='info'>
            <span className='expense'>{this.props.expense.charge}</span>
            <span className='amount'> {this.props.expense.amount}</span>
          </div>
          <div>
            <button className='edit-btn'>
              <MdEdit></MdEdit>
            </button>
            {/* filter 메소드를 이용하여 해당하는 요소 지우기 */}
            <button className='clear-btn' onClick={() => {
              this.props.handleDelete(this.props.expense.id)
            }}>
              <MdDelete></MdDelete>
            </button>
          </div>
        </li>
      </>
    )
  }
}

export default ExpenseItem
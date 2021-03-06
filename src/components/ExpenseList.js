import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Lower order component, not connected to the redux store
const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => {
            // if we had just said expense={expense}, then the passed in property would have been props, and we would have had to access it as props.expense.
            // Now, we pass in each property spread out, and we can destructure it when we call the function
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )
      }
    </div>
  </div>
);

// Functions (such as mapStateToProps) that usually return some part of state from the redux store
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
}

// Higher order component
export default connect(mapStateToProps)(ExpenseList);

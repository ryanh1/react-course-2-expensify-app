import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ACTION generators

// ADD_EXPENSE action
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE action
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE action
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
// You do not have to set a default value for undefined since that is the normal functionality for arguments by default
// You must pass in the startDate data here as part of the object
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// REDUCERS

// Expenses reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => {
        return id != action.id
      })
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          // Return a new object
          // Grab all of the expense properties of that object
          // Override any properties that were passed down with action.updates
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        };
      });
    default:
      return state;
  }
};

// Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        // We set the start date to be available on action.startDate
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}

// Get visible expenses
// It takes 2 arguments: expenses and filters, with filters destructured
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDates }) => {

  // If all 3 of these are true, then filter will return true, and the item will be kept in the array.  If any are false, the item will be removed from the array
  // startDate and endDate are timestamps that are numbers (any positive or negative integer).  They are milliseconds, with the timestamp zero starting at January 1st 1970, which is known at the unix epoch.
  // There are 1000 miliseconds in 1 second
  return expenses.filter((expense) => {
    // If the startDate is not equal to a number, then startDateMatch will be true
    // This is so that if startDate is not supplied, we don't take it into account when filtering.  We just ignore it.
    // If startDate is a number, then we check to see if expense.createdAt date is >= the passed in startDate.  If it is, then we leave it in.  Otherwise, it is filtered out.
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    // Check to see if the text in expense.description includes the passed in text from the filter, assuming it's all lower case
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
    // Sort is called on an array, and it returns an array
  }).sort((a, b) => {
    if (sortBy === 'date') {
      // If we want to sort by the date, then...
      // If we return 1, then a would come first.  If we return -1, then b would come first
      // If a.createdAt < b.createdAt, then we will toss b first, meaning that the most recent expense is at the top.
      // Otherwise, return -1, meaning that a comes first.
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      // if a.mount < b.amount, the truthy value will be 1, meaning that b will come first in the list.  otherwise, it will return -1, meaning that a comes first.
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

// createStore
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

// subscribe call
store.subscribe(() =>  {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// dispatch calls
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -22000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// // editExpense takes 2 arguments.  the first is the id.  The second is the updates object.  We are going to just update the amount
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
//
store.dispatch(sortByAmount()); // amount
store.dispatch(sortByDate()); // date
//
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

// demoState
const demoState = {
  expenses: [{
    id: 'asdfasdf',
    description: 'January rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filter: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

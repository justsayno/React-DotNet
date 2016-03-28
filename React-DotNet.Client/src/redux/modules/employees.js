import fetch from 'isomorphic-fetch'
import { API_ROOT_URI } from 'constants'
import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ALL_EMPLOYEES = 'REQUEST_ALL_EMPLOYEES'
export const RECEIVE_ALL_EMPLOYEES = 'RECEIVE_ALL_EMPLOYEES'

// ------------------------------------
// Actions
// ------------------------------------
export function requestAllEmployees () {
  return {
    type: REQUEST_ALL_EMPLOYEES,
    employees: []
  }
}

function receiveAllEmployees (json) {
  return {
    type: RECEIVE_ALL_EMPLOYEES,
    employees: json,
    receivedAt: Date.now()
  }
}

export function fetchAllEmployeesIfNeeded (force = false) {
  return (dispatch, getState) => {
    let currentState = getState()
    if (force || shouldFetchEmployees(currentState)) {
      return dispatch(fetchAllEmployees())
    }
  }
}

export function fetchAllEmployees () {
  return (dispatch) => {
    dispatch(requestAllEmployees())
    return fetch(`${API_ROOT_URI}/employee`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch(receiveAllEmployees(json)))
    .catch((ex) => {
      console.log('Error getting employees: ' + ex)
    })
  }
}

export const actions = {
  requestAllEmployees,
  receiveAllEmployees
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ALL_EMPLOYEES]: (state, action) => {
    console.log('Action called => REQUEST_ALL_EMPLOYEES')
    return Object.assign({}, state, {
      hasLoaded: false,
      isFetching: true,
      allEmployees: action.employees
    })
  },
  [RECEIVE_ALL_EMPLOYEES]: (state, action) => {
    console.log('Action called => RECEIVE_ALL_EMPLOYEES')
    return Object.assign({}, state, {
      hasLoaded: true,
      isFetching: false,
      allEmployees: action.employees
    })
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
const employeesSelector = (state) => state.employees

export const EmployeeDashboardSelector = createSelector(
  employeesSelector,
  (employees) => ({
    employees: employees.allEmployees,
    hasLoaded: employees.hasLoaded,
    isFetching: employees.isFetching,
    didInvalidate: employees.didInvalidate
  })
)

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasLoaded: false,
  isFetching: false,
  didInvalidate: false,
  allEmployees: []
}

export default function employeeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// ------------------------------------
// Helpers
// ------------------------------------
function shouldFetchEmployees (state) {
  const { employees } = state
  if (!employees.items) {
    return true
  } else if (employees.isFetching) {
    return false
  } else if (!employees.hasLoaded) {
    return true
  } else {
    return employees.didInvalidate
  }
}

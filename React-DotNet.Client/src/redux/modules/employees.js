import fetch from 'isomorphic-fetch'
import { API_ROOT_URI } from 'constants'
import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ALL_EMPLOYEES = 'REQUEST_ALL_EMPLOYEES'
export const RECEIVE_ALL_EMPLOYEES = 'RECEIVE_ALL_EMPLOYEES'
export const REQUEST_CREATE_EMPLOYEE = 'REQUEST_CREATE_EMPLOYEE'
export const RECEIVE_CREATE_EMPLOYEE = 'RECEIVE_CREATE_EMPLOYEE'
export const INVALIDATE_EMPLOYEES = 'INVALIDATE_EMPLOYEES'

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

function employeeCreating (payload) {
  return {
    type: REQUEST_CREATE_EMPLOYEE
  }
}

function employeeCreated (json) {
  return {
    type: RECEIVE_CREATE_EMPLOYEE,
    employeeId: json.id
  }
}

export function invalidateEmployees () {
  return {
    type: INVALIDATE_EMPLOYEES
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

export function createEmployee (payload) {
  return (dispatch) => {
    dispatch(employeeCreating())
    return fetch(`${API_ROOT_URI}/employee`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(employeeCreated(json))
        dispatch(invalidateEmployees())
      })
      .catch((ex) => {
        console.log('Error creating employee: ' + JSON.stringify(ex))
      })
  }
}

export const actions = {
  requestAllEmployees,
  receiveAllEmployees,
  employeeCreating
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
      allEmployees: action.employees,
      didInvalidate: false
    })
  },
  [REQUEST_CREATE_EMPLOYEE]: (state, action) => {
    console.log('Action called => REQUEST_CREATE_EMPLOYEE')
    return Object.assign({}, state, {
      lastCreatedId: null
    })
  },
  [RECEIVE_CREATE_EMPLOYEE]: (state, action) => {
    console.log('Action called => RECEIVE_CREATE_EMPLOYEE')
    return Object.assign({}, state, {
      lastCreatedId: action.employeeId
    })
  },
  [INVALIDATE_EMPLOYEES]: (state, action) => {
    console.log('Action called => INVALIDATE_EMPLOYEES')
    return Object.assign({}, state, {
      didInvalidate: true
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
  lastCreatedId: null,
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
  if (!employees.allEmployees) {
    return true
  } else if (employees.isFetching) {
    return false
  } else if (!employees.hasLoaded) {
    return true
  } else {
    return employees.didInvalidate
  }
}

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import employees from './modules/employees'

export default combineReducers({
  employees,
  router
})

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

import employees from './modules/employees'

export default combineReducers({
  employees,
  router,
  form: formReducer
})

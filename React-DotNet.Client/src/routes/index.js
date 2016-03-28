import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import { EmployeeDashboardView, EmployeeAddView, EmployeeProfileView } from 'views/Employee'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={EmployeeDashboardView}/>
    <Route component={EmployeeAddView} path='/employee/add'/>
    <Route component={EmployeeProfileView} path='/employee/:employeeId'/>
  </Route>
)

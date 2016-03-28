import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import { EmployeeDashboard } from 'components/employees'

// redux
import { EmployeeDashboardSelector, fetchAllEmployeesIfNeeded } from 'redux/modules/employees'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EmployeeDashboardView extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })).isRequired,
    fetchAllEmployeesIfNeeded: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchAllEmployeesIfNeeded()
  }

  render () {
    let { employees } = this.props
    return (
      <EmployeeDashboard employees={employees}/>
    )
  }
}

export default connect((EmployeeDashboardSelector), {
  fetchAllEmployeesIfNeeded
})(EmployeeDashboardView)

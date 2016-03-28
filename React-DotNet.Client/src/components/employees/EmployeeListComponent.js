import React, { Component, PropTypes } from 'react'

// Components
import { EmployeeListItem } from 'components/employees'

class EmployeeListComponent extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })).isRequired
  }
  render () {
    const { employees } = this.props
    var employeeNodes = employees.map((employee) => {
      return <EmployeeListItem Id={employee.id} FullName={employee.fullName} Role={employee.role} key={employee.id} />
    })
    return (
      <div className='container-fluid'>
        {employeeNodes}
      </div>
    )
  }
}

export default EmployeeListComponent

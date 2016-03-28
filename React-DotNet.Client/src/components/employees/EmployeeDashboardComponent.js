import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// Components
import { EmployeeList } from 'components/employees'

class EmployeeDashboardComponent extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })).isRequired
  }
  render () {
    const { employees } = this.props
    return (
      <div className='container-fluid employee-dashboard'>
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className='page-header'>
              Employee Dashboard
              <span className='small pull-right'>
                <Link to='/employee/add' className='btn btn-default'>
                  <i className='fa fa-plus'></i> Add Employee
                </Link>
              </span>
            </h1>
          </div>
        </div>
        <EmployeeList employees={employees}/>
      </div>
    )
  }
}

export default EmployeeDashboardComponent

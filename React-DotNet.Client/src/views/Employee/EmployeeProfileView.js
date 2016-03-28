import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EmployeeProfileView extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })).isRequired,
    params: PropTypes.object
  }

  render () {
    const { employees, params: { employeeId } } = this.props
    let employee = employees.filter((e) => e.id === employeeId)[0]
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <h1 className='page-header'>
                Employee Profile
              </h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <h2>{employee.fullName}</h2>
              <p>
                <strong>Role</strong>:
                <br/>
                {employee.role}
              </p>
              <p>
                <strong>Biography:</strong>:
                <br/>
                {employee.biography}
              </p>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees.allEmployees
})

export default connect((mapStateToProps), {
})(EmployeeProfileView)

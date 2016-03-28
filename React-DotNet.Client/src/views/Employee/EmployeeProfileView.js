import React, { Component } from 'react'
import { connect } from 'react-redux'

let employee = {
  'id': '74e1f9ea-2c3d-4cfa-9923-4c78a68d10f5',
  'fullName': 'Lina Greer',
  'role': 'Project Manager',
  'biography': 'On time on budget every time.'
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EmployeeAddView extends Component {

  render () {
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
})

export default connect((mapStateToProps), {
})(EmployeeAddView)

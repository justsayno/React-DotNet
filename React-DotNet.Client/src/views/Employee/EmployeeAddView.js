import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EmployeeAddForm } from 'components/employees'

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
                Add Employee
              </h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <EmployeeAddForm/>
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

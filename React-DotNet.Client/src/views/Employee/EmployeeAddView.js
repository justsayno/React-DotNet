import React, { Component } from 'react'
import { connect } from 'react-redux'

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
              <form>
                <div className='form-group'>
                  <label>Name</label>
                  <input className='form-control'/>
                </div>
                <div className='form-group'>
                  <label>Role:</label>
                  <br/>
                  <select className='form-control'>
                    <option>Programmer</option>
                    <option>Project Manager</option>
                    <option>Sales</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label>Biography:</label>
                  <textarea className='form-control' rows='5'></textarea>
                </div>
                <button type='submit' className='btn btn-default'>Submit</button>
              </form>
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

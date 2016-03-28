import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
export const fields = ['fullName', 'role', 'biography']

import { createEmployee } from 'redux/modules/employees'

const submit = (values, dispatch) => {
  dispatch(createEmployee(values))
}

class EmployeeAddFormComponent extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render () {
    const {
      fields: {fullName, role, biography},
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return (<form onSubmit={handleSubmit(submit)}>
      <div className='form-group'>
        <label>Full Name</label>
        <div>
          <input className='form-control' type='text' placeholder='First Name' {...fullName}/>
        </div>
      </div>
      <div className='form-group'>
        <label>Role</label>
        <div>
          <select className='form-control'
            {...role}
            value={role.value || ''}
            >
            <option></option>
            <option value='Programmer'>Programmer</option>
            <option value='Project Manager'>Project Manager</option>
            <option value='Sales'>Sales</option>
          </select>
        </div>
      </div>
      <div className='form-group'>
        <label>Biography</label>
        <div>
          <textarea className='form-control'
            {...biography}
            value={biography.value || ''}
            />
        </div>
      </div>
      <div>
        <button className='btn btn-success' type='submit' disabled={submitting}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button className='btn btn-primary pull-right' type='button' disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </div>
    </form>
    )
  }
}

export default reduxForm({
  form: 'add-employee',
  fields
})(EmployeeAddFormComponent)

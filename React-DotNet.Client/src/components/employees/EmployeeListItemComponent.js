import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

class EmployeeListItemComponent extends Component {
  static propTypes = {
    FullName: PropTypes.string.isRequired,
    Role: PropTypes.string.isRequired
  }
  render () {
    let { FullName, Role } = this.props
    let panelClass = classNames({
      'panel': true,
      'panel-green': Role === 'Programmer',
      'panel-red': Role === 'Project Manager',
      'panel-yellow': Role === 'Sales'
    })

    return (
      <div className='col-lg-3 col-md-6 employee-tile'>
        <div className={panelClass}>
          <div className='panel-heading'>
            <div className='row'>
              <div className='col-xs-3'>
                <i className='fa fa-user fa-5x'></i>
              </div>
              <div className='col-xs-9 text-right'>
                <h3>{FullName}</h3>
                <div>{Role}</div>
              </div>
            </div>
          </div>
          <Link to='/employee/1'>
            <div className='panel-footer'>
              <span className='pull-left'>View Profile</span>
              <span className='pull-right'><i className='fa fa-arrow-circle-right'></i></span>
              <div className='clearfix'></div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default EmployeeListItemComponent

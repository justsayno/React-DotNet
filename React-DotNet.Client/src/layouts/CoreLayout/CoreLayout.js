import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import '../../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div id='wrapper'>
      <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>React-DotNet</Link>
        </div>
        <ul className='nav navbar-right top-nav'>
          <li>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> John Smith</a>
          </li>
        </ul>
        <div className='collapse navbar-collapse navbar-ex1-collapse'>
          <ul className='nav navbar-nav side-nav'>
            <li>
              <Link to='/'><i className='fa fa-fw fa-dashboard'></i> Employee Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div id='page-wrapper'>
        <div className='container-fluid'>
          {children}
        </div>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout

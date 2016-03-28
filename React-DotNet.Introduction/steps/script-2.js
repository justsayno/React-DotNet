var Employee = React.createClass({
    render: function() {
        return (
            <div className='col-lg-3 col-md-6 employee-tile'>
                <div className='panel panel-green'>
                    <div className='panel-heading'>
                        <div className='row'>
                            <div className='col-xs-3'>
                                <i className='fa fa-user fa-5x'></i>
                            </div>
                            <div className='col-xs-9 text-right'>
                                <h3>{this.props.FullName}</h3>
                                <div>{this.props.Role}</div>
                            </div>
                        </div>
                    </div>
                    <a href='/employee/1'>
                        <div className='panel-footer'>
                            <span className='pull-left'>View Profile</span>
                            <span className='pull-right'><i className='fa fa-arrow-circle-right'></i></span>
                            <div className='clearfix'></div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
});

var EmployeeList = React.createClass({
    render: function() {
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <Employee FullName='Larisa Avery' Role='Programmer'/>
                    <Employee FullName='Lina Greer' Role='Project Manager'/>
                    <Employee FullName='Hanna Error' Role='Programmer'/>
                    <Employee FullName='Andrus Kaufer' Role='Sales'/>
                </div>
            </div>
        )
    }
});

var EmployeeDashboard = React.createClass({
    render: function() {
        return(
            <div className='container-fluid employee-dashboard'>
                <EmployeeList/>
            </div>
        )
    }
});

ReactDOM.render(
    <EmployeeDashboard/>,
    document.getElementById('content')
);
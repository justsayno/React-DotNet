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
        var employeeNodes = this.props.data.map(function(employee) {
            return (
                <Employee FullName={employee.fullName} Role={employee.role} key={employee.id} />
            );
        });
        return(
            <div className='container-fluid'>
                {employeeNodes}
            </div>
        )
    }
});

var EmployeeDashboard = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return(
            <div className='container-fluid employee-dashboard'>
                <EmployeeList data={this.state.data}/>
            </div>
        )
    }
});

ReactDOM.render(
    <EmployeeDashboard url='employees.json'  />,
    document.getElementById('content')
);
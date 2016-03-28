var employees = [
    {
        "id": "74e1f9ea-2c3d-4cfa-9923-4c78a68d10f5",
        "fullName": "Lina Greer",
        "role": "Project Manager",
        "biography": "On time on budget every time."
    },
    {
        "id": "4106663c-002f-4d91-8d18-9dff448c8c21",
        "fullName": "Hanna Error",
        "role": "Programmer",
        "biography": "Front end developer with a background in design and React Native."
    },
    {
        "id": "2b307238-8e43-4799-9c62-d69b3f2faf93",
        "fullName": "Larisa Avery",
        "role": "Programmer",
        "biography": "A very competent and skillful programmer with background in React and ASPNET Core."
    },
    {
        "id": "9ced697a-6e23-43dc-8e3f-ee4f3f30185a",
        "fullName": "Andrus Kauger",
        "role": "Sales",
        "biography": "Top sales person every month for the last 2 years."
    }
]

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
    render: function() {
        return(
            <div className='container-fluid employee-dashboard'>
                <EmployeeList data={employees}/>
            </div>
        )
    }
});

ReactDOM.render(
    <EmployeeDashboard />,
    document.getElementById('content')
);
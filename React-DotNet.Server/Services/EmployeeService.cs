using Microsoft.Data.Entity;
using React_DotNet.Server.Data;
using React_DotNet.Server.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_DotNet.Server.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        public EmployeeService(ApplicationDbContext uoW, DbSet<Employee> primaryRepository)
            : base(uoW, primaryRepository)
        {

        }
    }
}

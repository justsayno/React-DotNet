using Microsoft.Data.Entity.Metadata.Builders;
using React_DotNet.Server.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_DotNet.Server.Data.Mapping
{
    internal sealed class EmployeeMap : Mapper<Employee>
    {
        internal override void GetMap(EntityTypeBuilder<Employee> map)
        {
            base.GetMap(map);
        }
    }
}

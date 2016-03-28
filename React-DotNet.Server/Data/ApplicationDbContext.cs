using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using React_DotNet.Server.Data.Entities;
using React_DotNet.Server.Data.Mapping;

namespace React_DotNet.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity(EmployeeMap.Map<EmployeeMap>());
        }
    }
}

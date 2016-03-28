using Autofac;
using React_DotNet.Server.Constants;
using React_DotNet.Server.Data;
using React_DotNet.Server.Data.Entities;
using React_DotNet.Server.Models;
using React_DotNet.Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_DotNet.Server.Autofac
{
    public class ServerModule : Module
    {
        private readonly Microsoft.Extensions.Configuration.IConfiguration _config;
        public ServerModule(Microsoft.Extensions.Configuration.IConfiguration config)
        {
            _config = config;
        }

        protected override void Load(ContainerBuilder builder)
        {
            // application configuration
            var scriptHost = _config[ConfigurationStringConstants.Frontend.ScriptHostUrl];
            builder.Register(c => new ApplicationOptionsModel()
            {
                ScriptHostUrl = scriptHost
            })
            .InstancePerLifetimeScope();

            // services
            RegisterService<EmployeeService, IEmployeeService, Employee>(builder);

        }

        private void RegisterService<ServiceImplementation, ServiceInterface, Entity>(ContainerBuilder builder)
            where ServiceImplementation : BaseService<Entity>
            where ServiceInterface : IService<Entity>
            where Entity : class, IEntity<Guid>
        {
            builder.Register(c =>
            {
                var context = c.Resolve<ApplicationDbContext>();
                var service = Activator.CreateInstance(typeof(ServiceImplementation), context, context.Set<Entity>()) as ServiceImplementation;
                return service;
            }).As<ServiceInterface>()
                .InstancePerLifetimeScope();
        }
    }
}

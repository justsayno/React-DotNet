using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_DotNet.Server.Constants
{
    public static class ConfigurationStringConstants
    {
        public static class Data
        {
            public static string DefaultConnectionString = "Data:DefaultConnection:ConnectionString";
        }

        public static class Frontend {
            public const string BaseString = "Frontend";
            public static string ScriptHostUrl = $"{BaseString}:ScriptHostUrl";
            public static string DevelopmentHost = $"{BaseString}:DevelopmentHost";
        }
    }
}

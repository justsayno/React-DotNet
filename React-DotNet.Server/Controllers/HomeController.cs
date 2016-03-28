using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using React_DotNet.Server.Constants;
using React_DotNet.Server.Models;

namespace React_DotNet.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationOptionsModel _applicationOptions;

        public HomeController(ApplicationOptionsModel applicationOptions)
        {
            _applicationOptions = applicationOptions;
        }

        public IActionResult Index()
        {
            var scriptHostUrl = _applicationOptions.ScriptHostUrl;
            var model = new HomeModel()
            {
                VendorUrl = GetScriptUrl(scriptHostUrl, AssetConstants.Scripts.VendorScriptName),
                AppUrl = GetScriptUrl(scriptHostUrl, AssetConstants.Scripts.AppScriptName),
            };
            return View(model);
        }

        public IActionResult Error()
        {
            return View();
        }

        private Uri GetScriptUrl(string scriptHost, string scriptName, string hash = null)
        {
            var appUrlString = string.IsNullOrWhiteSpace(hash) ?
                $"{scriptHost}/{scriptName}" :
                $"{scriptHost}/{hash}/{scriptName}";
            return new Uri(appUrlString);
        }
    }
}

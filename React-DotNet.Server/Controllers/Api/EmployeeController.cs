using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http;
using React_DotNet.Server.Services;
using Microsoft.Data.Entity;
using React_DotNet.Server.Data.Entities;
using Microsoft.AspNet.Cors;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace React_DotNet.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employeeService.Search().ToListAsync();
            return Ok(employees);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var employee = await _employeeService.GetById(id);
            if (employee != null)
            {
                return Ok(employee);
            }
            else
            {
                return HttpBadRequest($"Unable to find employee.");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Employee data)
        {
            var createdEmployeeId = await _employeeService.Create(data);
            if (createdEmployeeId != default(Guid))
            {
                var hostname = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
                return Created($"{hostname}/api/employee/{createdEmployeeId}", new { Id = createdEmployeeId });
            }
            else
            {
                return HttpBadRequest($"Unable to create employee.");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]string value)
        {
            return HttpNotFound();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return HttpNotFound();
        }
    }
}

using System;
using Microsoft.AspNetCore.Mvc;
using EmployeesApi.Services;
using EmployeesApi.Models;


namespace EmployeesApi.Controllers;

[Controller]
[Route("api/[controller]")]
public class EmployeesController : Controller
{


  private readonly MongoDBService _mongoDBService;

  public EmployeesController(MongoDBService mongoDBService)
  {
    _mongoDBService = mongoDBService;
  }

  [HttpGet]
  public async Task<List<Employee>> Get()
  {
    return await _mongoDBService.GetAsync();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    await _mongoDBService.DeleteAsync(id);
    return NoContent();
  }


  [HttpPost]
  public async Task<IActionResult> Post([FromBody] Employee employee)
  {
    await _mongoDBService.CreateAsync(employee);
    return CreatedAtAction(nameof(Get), new { id = employee.Id }, employee);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Put(int id, [FromBody] Employee updatedEmployee)
  {
    if (updatedEmployee == null)
    {
      return BadRequest("Invalid request body. Employee data is required.");
    }

    if (id != updatedEmployee.Id)
    {
      return BadRequest("The provided ID in url isn't correct");
    }



    // update the employee data
    await _mongoDBService.UpdateAsync(id, updatedEmployee);


    return NoContent();
  }

}





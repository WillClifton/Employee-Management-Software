using EmployeesApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeesApi.Services;


public class MongoDBService
{
  private readonly IMongoCollection<Employee> _employeesCollection;


  public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
  {

    var settings = mongoDBSettings.Value;

    MongoClient client = new MongoClient(settings.ConnectionURI);
    IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
    _employeesCollection = database.GetCollection<Employee>(settings.CollectionName);
  }

  public async Task CreateAsync(Employee employee)
  {

    if (employee == null)
    {
      throw new ArgumentException(nameof(employee), "The employee parameter cannot be null");
    }

    await _employeesCollection.InsertOneAsync(employee);
    return;
  }

  public async Task<List<Employee>> GetAsync()
  {
    return await _employeesCollection.Find(new BsonDocument()).ToListAsync();
  }

  public async Task DeleteAsync(int id)
  {
    FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("Id", id);

    await _employeesCollection.DeleteOneAsync(filter);
    return;
  }

  public async Task UpdateAsync(int id, Employee updatedEmployee)
  {
    if (updatedEmployee == null)
    {
      throw new ArgumentException(nameof(updatedEmployee), "The paramater cannot be null");
    }

    FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("Id", id);
    ReplaceOneModel<Employee> replacement = new ReplaceOneModel<Employee>(filter, updatedEmployee);

    await _employeesCollection.ReplaceOneAsync(filter, updatedEmployee);
    return;
  }

}
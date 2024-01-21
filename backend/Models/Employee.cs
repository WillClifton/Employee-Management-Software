using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;


namespace EmployeesApi.Models;

public class Employee
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  [BsonElement("objectId")]

  public string ObjectId { get; set; }

  [BsonElement("id")]
  public int Id { get; set; }

  [BsonElement("date")]
  public string Date { get; set; }

  [BsonElement("email")]
  public string Email { get; set; }

  [BsonElement("firstName")]
  public string FirstName { get; set; }

  [BsonElement("lastName")]
  public string LastName { get; set; }

  [BsonElement("salary")]
  public string Salary { get; set; }
}

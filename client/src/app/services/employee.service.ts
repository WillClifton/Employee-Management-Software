import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../environment';

const apiUrl = `${environment.apiBaseUrl}/api/employees`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    let url = 'http://localhost:5100/api/employees';

    return this.http.get<Employee[]>(url);
  }

  deleteEmployee(id: number) {
    let url = `${apiUrl}/${id}`;
    console.log(id, 'testing');

    return this.http.delete(url);
  }

  addNewEmployee(employee: Employee) {
    console.log(employee);

    let url = 'http://localhost:5100/api/employees/';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(apiUrl, employee, httpOptions);
  }

  updateEmployee(employee: Employee) {
    let id: number = employee.id;
    let url = `${apiUrl}/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(url, employee, httpOptions);
  }

  constructor() {}
}

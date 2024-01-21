import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { Store } from '@ngrx/store';
import { Employee } from './models/employee';
import { loadEmployees } from './state/employee.actions';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddEmployeeComponent,
    EmployeeItemComponent,
    EmployeeListComponent,
    HttpClientModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);
  employeeService = inject(EmployeeService);

  displayAddEmployeeComponent = false;

  ngOnInit() {
    console.log('hello world2 ');
    this.employeeService.getEmployees().subscribe((employees) => {
      console.log(employees);
      this.store.dispatch(loadEmployees({ employees }));
    });
  }

  employees: Employee[] = [];
  title = 'crudapp';
  addEmployee = false;
}

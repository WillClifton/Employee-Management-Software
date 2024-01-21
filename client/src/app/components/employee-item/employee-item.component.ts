import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteEmployee } from '../../state/employee.actions';
import { NgModel, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { updateEmployee } from '../../state/employee.actions';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-item',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.scss',
})
export class EmployeeItemComponent {
  store = inject(Store);
  employeeService = inject(EmployeeService);
  enableEdit = false;
  employees: Employee[] = [];

  constructor() {
    this.store.select('employees').subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  updatedEmployee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    date: '',
    objectId: '',
  };
  @Input() id!: number;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() email!: string;
  @Input() salary!: string;
  @Input() date!: string;

  deleteEmployee = () => {
    this.employeeService.deleteEmployee(this.id).subscribe(
      () => {
        console.log('success');
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
    this.store.dispatch(deleteEmployee({ employeeId: this.id }));
  };

  editEmployee = () => {
    this.enableEdit = !this.enableEdit;
  };

  saveEmployee = () => {
    // find the employee
    const targetEmployee = this.employees.find((obj) => obj.id === this.id);

    if (targetEmployee) {
      this.updatedEmployee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        salary: this.salary,
        date: this.date,
        objectId: targetEmployee.objectId,
      };

      console.log(this.updatedEmployee);

      // api call
      this.employeeService.updateEmployee(this.updatedEmployee).subscribe(
        () => {
          console.log('success');
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );

      this.store.dispatch(updateEmployee({ employee: this.updatedEmployee }));

      this.editEmployee();
    }
  };
}

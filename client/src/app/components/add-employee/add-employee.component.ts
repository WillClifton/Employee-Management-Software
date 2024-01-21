import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { NgModel, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addEmployee } from '../../state/employee.actions';
import { deleteEmployee } from '../../state/employee.actions';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  employeeService = inject(EmployeeService);
  private store = inject(Store);
  displayComponent = false;
  employees: Employee[] = [];

  constructor() {
    this.store.select('employees').subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  generateObjectId(length: number): string {
    const characters = 'abcdef0123456789';
    let uniqueString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueString += characters.charAt(randomIndex);
    }

    return uniqueString;
  }

  uniqueString: string = this.generateObjectId(24);

  newEmployee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    date: '',
    objectId: this.uniqueString,
  };

  // checks if fields are empty
  isAllFieldsValid = () => {
    return Object.values(this.newEmployee).every(
      (value) => value !== '' && value !== 0
    );
  };

  setDisplayComponent = () => {
    this.displayComponent = !this.displayComponent;
    console.log(this.displayComponent);
  };

  addEmployee = () => {
    console.log(this.employees);

    const highestId = this.employees.reduce((maxId, employee) => {
      return employee.id > maxId ? employee.id : maxId;
    }, 0);

    this.newEmployee.id = highestId + 1;

    if (this.isAllFieldsValid()) {
      this.employeeService.addNewEmployee(this.newEmployee).subscribe(
        () => {
          console.log('success');
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
      this.store.dispatch(addEmployee({ employee: this.newEmployee }));

      // clear the inputs
    } else {
      console.log('please enter all the required fields');
    }
    this.newEmployee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      salary: '',
      date: '',
      objectId: '',
    };
  };
}

import { Component, inject } from '@angular/core';
import { EmployeeItemComponent } from '../employee-item/employee-item.component';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeItemComponent, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private store = inject(Store);

  employees: Employee[] = [];

  constructor() {
    this.store.select('employees').subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    });
  }
}

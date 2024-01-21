import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  deleteEmployee,
  loadEmployees,
  updateEmployee,
} from '../state/employee.actions';
import { Employee } from '../models/employee';

export const initialState: Employee[] = [];

export const employeeRedcuer = createReducer(
  initialState,
  on(addEmployee, (state, { employee }) => {
    return [...state, employee];
  }),
  on(deleteEmployee, (state, { employeeId }) => {
    console.log('Deleting employee with ID:', employeeId);
    return state.filter((employee) => employee.id !== employeeId);
  }),
  on(updateEmployee, (state, { employee }) => {
    const index = state.findIndex((e) => e.id === employee.id);

    if (index !== -1) {
      return [
        ...state.slice(0, index),
        { ...employee },
        ...state.slice(index + 1),
      ];
    }

    return state;
  }),
  on(loadEmployees, (state, { employees }) => {
    return employees;
  })
);

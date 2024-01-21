// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import * as EmployeeActions from './employee.actions';
// import { EmployeeService } from '../services/employee.service';

// @Injectable()
// export class EmployeeEffects {
//   loadEmployees$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(EmployeeActions.loadEmployees),
//       mergeMap(() =>
//         this.employeeService
//           .getEmployees()
//           .pipe(
//             map((employees) => EmployeeActions.loadEmployees({ employees }))
//           )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private employeeService: EmployeeService
//   ) {}
// }

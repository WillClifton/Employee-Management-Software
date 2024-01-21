import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { employeeRedcuer } from './employee.reducer';
import { Employee } from '../models/employee';

export interface State {
  employees: Employee[];
}

export const reducers: ActionReducerMap<State> = {
  employees: employeeRedcuer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

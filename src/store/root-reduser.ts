import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitarsProcessData } from './guitars-process-data/guitars-process-data';
import { siteProcessData } from './site-process-data/site-process-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsProcessData.reducer,
  [NameSpace.Site]: siteProcessData.reducer,
});

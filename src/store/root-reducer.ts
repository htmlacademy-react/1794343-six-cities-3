import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import userProcess from './user-process';
import mainProcess from './main';
import favoritesProcess from './favorites';
import offerProcess from './offer';
import reviewsProcess from './reviews';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});

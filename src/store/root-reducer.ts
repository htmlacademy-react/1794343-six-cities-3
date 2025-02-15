import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../helpers/const';
import userProcess from './user-process';
import mainProcess from './main-process';
import favoritesProcess from './favorites-process';
import offerProcess from './offer-process';
import reviewsProcess from './reviews-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});

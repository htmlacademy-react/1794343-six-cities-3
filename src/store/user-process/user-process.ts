import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
//import { favoritesProcess } from '../favorites/favorites';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};
const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: ''
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    //favoritesProcess.state.favoriteOffers
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
      });
  }
});

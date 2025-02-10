import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  email: string;
  avatarUrl: string;
};
const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: '',
  avatarUrl: ''
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        const {email, avatarUrl} = action.payload;
        state.email = email;
        state.avatarUrl = avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        const {email, avatarUrl} = action.payload;
        state.email = email;
        state.avatarUrl = avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      });
  }
});

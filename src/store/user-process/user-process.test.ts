import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  const authData = {
    email: 'roblox@mergeAlias.ru',
    password: 'ki8'
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg' };
    const result = userProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      email: '',
      avatarUrl: '' };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth", add email and avatarURL with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
      avatarUrl: ''};
    const userData = {
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'
    };
    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(userData, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", clear email and avatarURL with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
      avatarUrl: ''};
    const result = userProcess.reducer(initialState, checkAuthAction.rejected(null, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth", add email and avatarURL with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
      avatarUrl: ''};
    const userData = {
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'
    };
    const result = userProcess.reducer(initialState, loginAction.fulfilled(userData, 'requestId', authData));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", clear email and avatarURL with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
      avatarUrl: ''};
    const result = userProcess.reducer(initialState, loginAction.rejected(null, 'requestId', authData));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", clear email and avatarURL with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'roblox@mergeAlias.ru',
      avatarUrl: 'http/sghsgh/chg'};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
      avatarUrl: ''};
    const result = userProcess.reducer(initialState, logoutAction.fulfilled(undefined, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });
});

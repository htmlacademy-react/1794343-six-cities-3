import {NameSpace} from '../../helpers/const';
import { State } from '../types';
import {AuthorizationStatus} from '../../helpers/const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getEmail = (state: State) =>
  state[NameSpace.User].email;

export const getAvatarURL = (state: State) =>
  state[NameSpace.User].avatarUrl;

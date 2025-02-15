import { NameSpace } from '../../helpers/const';
import { State } from '../types';

export const getOffers = (state: State) => state[NameSpace.Main].offers;
export const getisDataLoading = (state: State) => state[NameSpace.Main].isDataLoading;
export const getisDataLoadingError = (state: State) => state[NameSpace.Main].isDataLoadingError;


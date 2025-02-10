import { NameSpace } from '../../const';
import { State } from '../types';

export const getOffers = (state: State) => state[NameSpace.Main].offers;
export const getisDataLoading = (state: State) => state[NameSpace.Main].isDataLoading;


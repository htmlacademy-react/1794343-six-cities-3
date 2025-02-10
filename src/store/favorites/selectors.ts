import { NameSpace } from '../../const';
import { State } from '../types';

export const getFavortiteOffers = (state: State) => state[NameSpace.Favorites].favoriteOffers;
export const getisFavoriteChanging = (state: State) => state[NameSpace.Favorites].isFavoriteChanging;

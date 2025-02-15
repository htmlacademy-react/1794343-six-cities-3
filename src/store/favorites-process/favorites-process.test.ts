import { fetchFavoriteOffersAction, fetchChangeFavorite, logoutAction } from '../api-actions';
import { favoritesProcess } from './favorites-process';
import {
  makeFakeOffers,
  makeFakeOffer,
  makeFakeChangeFavoriteData,
  makeFakeAddtoFavoriteData,
  makeFakeDeletefromFavoriteData } from '../../helpers/mocks';

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeChangeFavoriteData = makeFakeChangeFavoriteData();
const fakeDeleteFavoriteResponce = makeFakeDeletefromFavoriteData(fakeOffer);
const fakeAddFavoriteResponce = makeFakeAddtoFavoriteData(fakeOffer);

describe('favoritesProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: true};
    const result = favoritesProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: [],
      isFavoriteChanging: false};
    const result = favoritesProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set fakeOffers for favoriteOffers with "fetchFavoriteOffersAction.fulfilled" action', () => {
    const initialState = {
      favoriteOffers: [],
      isFavoriteChanging: false};
    const expectedState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: false};
    const result = favoritesProcess.reducer(initialState, fetchFavoriteOffersAction.fulfilled(fakeOffers, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "true" for isFavoriteChanging with "fetchChangeFavorite.pending" action', () => {
    const initialState = {
      favoriteOffers: [],
      isFavoriteChanging: false};
    const expectedState = {
      favoriteOffers: [],
      isFavoriteChanging: true};
    const result = favoritesProcess.reducer(initialState, fetchChangeFavorite.pending('requestId', fakeChangeFavoriteData));
    expect(result).toEqual(expectedState);
  });

  it('should add fakeOffer to favoriteOffers with "fetchChangeFavorite.fulfilled" action', () => {
    const initialState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: false};
    const expectedState = {
      favoriteOffers: [...fakeOffers, fakeOffer],
      isFavoriteChanging: false};
    const result = favoritesProcess.reducer(initialState, fetchChangeFavorite.fulfilled(fakeAddFavoriteResponce, 'requestId', fakeChangeFavoriteData));
    expect(result).toEqual(expectedState);
  });

  it('should delete fakeOffer from favoriteOffers with "fetchChangeFavorite.fulfilled" action', () => {
    const initialState = {
      favoriteOffers: [...fakeOffers, fakeOffer],
      isFavoriteChanging: false};
    const expectedState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: false};
    const result = favoritesProcess.reducer(initialState, fetchChangeFavorite.fulfilled(fakeDeleteFavoriteResponce, 'requestId', fakeChangeFavoriteData));
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isFavoriteChanging "fetchChangeFavorite.rejected" action', () => {
    const initialState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: true};
    const expectedState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: false};
    const result = favoritesProcess.reducer(initialState, fetchChangeFavorite.rejected(null, 'requestId', fakeChangeFavoriteData));
    expect(result).toEqual(expectedState);
  });

  it('should set [] for favoriteOffers with "logoutAction.fulfilled" action', () => {
    const initialState = {
      favoriteOffers: fakeOffers,
      isFavoriteChanging: true};
    const expectedState = {
      favoriteOffers: [],
      isFavoriteChanging: true};
    const result = favoritesProcess.reducer(initialState, logoutAction.fulfilled(undefined, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });
});

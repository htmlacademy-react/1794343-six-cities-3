import { fetchOffersAction } from '../api-actions';
import { mainProcess } from './main-process';
import { makeFakeOffers } from '../../helpers/mocks';

const fakeOffers = makeFakeOffers();

describe('mainProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: fakeOffers,
      isDataLoading: true,
      isDataLoadingError: false};
    const result = mainProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isDataLoading: false,
      isDataLoadingError: false};
    const result = mainProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isDataLoadingError, "true" for isDataLoading with "fetchOffersAction.pending" action', () => {
    const initialState = {
      offers: [],
      isDataLoading: false,
      isDataLoadingError: true};
    const expectedState = {
      offers: [],
      isDataLoading: true,
      isDataLoadingError: false};
    const result = mainProcess.reducer(initialState, fetchOffersAction.pending('requestId', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isDataLoadingError, "false" for isDataLoading, add fakeOffers for offers with "fetchOffersAction.fulfilled" action', () => {
    const initialState = {
      offers: [],
      isDataLoading: true,
      isDataLoadingError: true};
    const expectedState = {
      offers: fakeOffers,
      isDataLoading: false,
      isDataLoadingError: false};
    const result = mainProcess.reducer(initialState, fetchOffersAction.fulfilled(fakeOffers, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "true" for isDataLoadingError, "false" for isDataLoading with "fetchOffersAction.rejected" action', () => {
    const initialState = {
      offers: [],
      isDataLoading: true,
      isDataLoadingError: false};
    const expectedState = {
      offers: [],
      isDataLoading: false,
      isDataLoadingError: true};
    const result = mainProcess.reducer(initialState, fetchOffersAction.rejected(null, 'requestId', undefined));
    expect(result).toEqual(expectedState);
  });
});

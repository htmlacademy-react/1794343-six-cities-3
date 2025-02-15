import { fetchCurrentOfferAction, fetchNearOffersAction } from '../api-actions';
import { offerProcess } from './offer-process';
import { makeFakeOffers, makeFakeOffer } from '../../helpers/mocks';
import { datatype } from 'faker';

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const offerId = datatype.uuid();

describe('offerProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentOffer: fakeOffer,
      nearOffers: fakeOffers,
      isOfferLoading: true,
      isNotFound: false};
    const result = offerProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: true,
      isNotFound: false};
    const result = offerProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isNotFound, "true" for isOfferLoading with "fetchCurrentOfferAction.pending" action', () => {
    const initialState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: false,
      isNotFound: true};
    const expectedState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: true,
      isNotFound: false};
    const result = offerProcess.reducer(initialState, fetchCurrentOfferAction.pending('requestId', offerId));
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isNotFound, "false" for isOfferLoading, fakeOffer for currentOffer with "fetchCurrentOfferAction.fulfilled" action', () => {
    const initialState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: true,
      isNotFound: true};
    const expectedState = {
      currentOffer: fakeOffer,
      nearOffers: [],
      isOfferLoading: false,
      isNotFound: false};
    const result = offerProcess.reducer(initialState, fetchCurrentOfferAction.fulfilled(fakeOffer, 'requestId', offerId));
    expect(result).toEqual(expectedState);
  });

  it('should set "true" for isNotFound, "false" for isOfferLoading with "fetchCurrentOfferAction.rejected" action', () => {
    const initialState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: true,
      isNotFound: false};
    const expectedState = {
      currentOffer: null,
      nearOffers: [],
      isOfferLoading: false,
      isNotFound: true};
    const result = offerProcess.reducer(initialState, fetchCurrentOfferAction.rejected(null, 'requestId', offerId));
    expect(result).toEqual(expectedState);
  });

  it('should set fakeOffers for nearOffers with "fetchNearOffersAction.fulfilled" action', () => {
    const initialState = {
      currentOffer: fakeOffer,
      nearOffers: [],
      isOfferLoading: false,
      isNotFound: false};
    const expectedState = {
      currentOffer: fakeOffer,
      nearOffers: fakeOffers,
      isOfferLoading: false,
      isNotFound: false};
    const result = offerProcess.reducer(initialState, fetchNearOffersAction.fulfilled(fakeOffers, 'requestId', offerId));
    expect(result).toEqual(expectedState);
  });
});

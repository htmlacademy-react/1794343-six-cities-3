import { fetchReviewsAction, addReviewAction} from '../api-actions';
import { reviewsProcess } from './reviews-process';
import { makeFakeReviewData, makeFakeReview, makeFakeReviews } from '../../helpers/mocks';
import { datatype } from 'faker';

const fakeReviewData = makeFakeReviewData();
const fakeReview = makeFakeReview();
const fakeReviews = makeFakeReviews();

describe('reviewsProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: fakeReviews,
      isReviewSending: true,
      isReviewSendingError: false};
    const result = reviewsProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isReviewSending: false,
      isReviewSendingError: false};
    const result = reviewsProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set fakeReviews with "fetchReviewsAction.fulfilled" action', () => {
    const initialState = {
      reviews: [],
      isReviewSending: false,
      isReviewSendingError: false};
    const offerId = datatype.uuid();
    const expectedState = {
      reviews: fakeReviews,
      isReviewSending: false,
      isReviewSendingError: false
    };
    const result = reviewsProcess.reducer(initialState, fetchReviewsAction.fulfilled(fakeReviews, 'requestId', offerId));
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isReviewSendingError, "true" for isReviewSending with "addReviewAction.pending" action', () => {
    const initialState = {
      reviews: [],
      isReviewSending: false,
      isReviewSendingError: true};
    const expectedState = {
      reviews: [],
      isReviewSending: true,
      isReviewSendingError: false};
    const result = reviewsProcess.reducer(initialState, addReviewAction.pending('requestId', fakeReviewData));
    expect(result).toEqual(expectedState);
  });

  it('should set "false" for isReviewSendingError, "false" for isReviewSending, add fakeReview for reviews with "addReviewAction.fulfilled" action', () => {
    const initialState = {
      reviews: fakeReviews,
      isReviewSending: true,
      isReviewSendingError: true};
    const expectedState = {
      reviews: [...fakeReviews, fakeReview],
      isReviewSending: false,
      isReviewSendingError: false};
    const result = reviewsProcess.reducer(initialState, addReviewAction.fulfilled(fakeReview, 'requestId', fakeReviewData));
    expect(result).toEqual(expectedState);
  });

  it('should set "true" for isReviewSendingError, "false" for isReviewSending with "addReviewAction.rejected" action', () => {
    const initialState = {
      reviews: [],
      isReviewSending: true,
      isReviewSendingError: false};
    const expectedState = {
      reviews: [],
      isReviewSending: false,
      isReviewSendingError: true};
    const result = reviewsProcess.reducer(initialState, addReviewAction.rejected(null, 'requestId', fakeReviewData));
    expect(result).toEqual(expectedState);
  });
});

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewType } from '../../pages/offer/types';
import { fetchReviewsAction, addReviewAction } from '../api-actions';

type InitialState = {
  reviews: ReviewType[];
  isReviewSending: boolean;
  isReviewSendingError: boolean;
};

const initialState: InitialState = {
  reviews: [],
  isReviewSending: false,
  isReviewSendingError: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewSending = true;
        state.isReviewSendingError = false;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.isReviewSending = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewSending = false;
        state.isReviewSendingError = true;
      });
  }
});

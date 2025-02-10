import { NameSpace } from '../../const';
import { State } from '../types';

export const getReviews = (state: State) => state[NameSpace.Reviews].reviews;
export const getisReviewSending = (state: State) => state[NameSpace.Reviews].isReviewSending;
export const getisReviewSendingError = (state: State) => state[NameSpace.Reviews].isReviewSendingError;


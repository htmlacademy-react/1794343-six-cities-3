import {name, internet, datatype} from 'faker';
import { ReviewType } from './types';
import { ReviewData } from '../store/types';

export const makeFakeReview = (): ReviewType => ({
  id: datatype.uuid(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.url(),
    isPro: datatype.boolean(),
  },
  comment: datatype.string(51),
  rating: datatype.number({ min: 1, max: 5}),
} as ReviewType);

export const makeFakeReviews = (count: number = 3): ReviewType[] => Array.from({ length: count }, () => makeFakeReview());

export const makeFakeReviewData = (): ReviewData => ({
  id: datatype.uuid(),
  comment: datatype.string(51),
  rating: datatype.number({ min: 1, max: 5}),
} as ReviewType);

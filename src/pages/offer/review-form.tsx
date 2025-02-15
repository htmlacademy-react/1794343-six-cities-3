import React, { FormEvent, useState, ChangeEvent, memo } from 'react';
import { ReviewRating } from './util';
import { useAppDispatch, useAppSelector} from '../../hooks/use-store';
import { addReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getisReviewSending, getisReviewSendingError } from '../../store/reviews-process/selectors';
import {toast} from 'react-toastify';


const ReviewForm = memo((): JSX.Element => {
  const ratings = Object.entries(ReviewRating);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {id} = useParams();
  const isReviewSending = useAppSelector(getisReviewSending);
  const isReviewSendingError = useAppSelector(getisReviewSendingError);
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (typeof id === 'string') {
      dispatch(addReviewAction({
        id,
        comment,
        rating
      }));
    }
  };

  useEffect(() => {
    if (isReviewSendingError) {
      toast.error('Error sending feedback. Please try again.');
    }
  }, [isReviewSendingError]);

  useEffect(() => {
    if (!isReviewSendingError && !isReviewSending) {
      setRating(0);
      setComment('');
    }
  }, [isReviewSendingError, isReviewSending]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(([value, title]) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                setRating(parseInt(target.value, 10));
              }}
              checked={rating === parseInt(value, 10)}
              disabled={isReviewSending}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(target.value);
        }}
        disabled={isReviewSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < 50 || comment.length >= 300 || rating === 0 || isReviewSending}
        >
          {isReviewSending ? 'Submiting' : 'Submit'}
        </button>
      </div>
    </form>
  );
});

ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;

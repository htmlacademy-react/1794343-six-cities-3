import React, { FormEvent, useState, ChangeEvent } from 'react';
import { OfferType } from '../../components/offer-card/types';

const ReviewRating = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
};

type ReviewFormProps = {
  offerId: OfferType['id'];
  onSubmit: (offerId: OfferType['id'], rating: number, comment: string) => void;
};


function ReviewForm({onSubmit, offerId}: ReviewFormProps): JSX.Element {
  const ratings = Object.entries(ReviewRating);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onSubmit(offerId, rating, comment);
      }}
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
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(target.value);
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit"
          disabled={comment.length < 50 || rating === 0}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

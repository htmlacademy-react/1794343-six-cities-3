import dayjs from 'dayjs';
import { memo } from 'react';
import { isPlural, changeDateFormat } from '../helpers';
import { REVIEWS_SHOWN_COUNT, DateFormat } from './util';
import { getRating } from '../helpers';
import { useAppSelector } from '../../hooks/use-store';
import { getReviews } from '../../store/reviews-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../helpers/const';
import ReviewForm from './review-form';

const Reviews = memo((): JSX.Element => {
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const filteredReviews = [...reviews].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  const shownReviews = filteredReviews.slice(0, REVIEWS_SHOWN_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        {`Review${isPlural(reviews.length) ? 's' : ''}`} &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {shownReviews.map((review) => {

          const {
            id,
            date,
            user,
            comment,
            rating } = review;

          return (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {user.name}
                </span>
                {user.isPro &&
                  <span className="reviews__user-status">
                    Pro
                  </span>}
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${getRating(rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment}
                </p>
                <time className="reviews__time" dateTime={date}>{changeDateFormat(date, DateFormat.REVIEW_DATE)}</time>
              </div>
            </li>);
        })}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ReviewForm />
      ) : null}
    </section>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;

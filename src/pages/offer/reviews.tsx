import { ReviewType } from './types';

type ReviewsProps = {
  reviews: ReviewType[];
}

function Reviews ({reviews}: ReviewsProps): JSX.Element {
  const shouwnReviews = reviews.slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{shouwnReviews.length}</span></h2>
      <ul className="reviews__list">
        {shouwnReviews.map((review) => {
          const {user} = review;
          return (
            <li className="reviews__item" key={review.id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {user.name}
                </span>
                {user.isPro ? (<span className="reviews__user-status">Pro</span>) : ''}
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${Math.round(review.rating) * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.comment}
                </p>
                <time className="reviews__time" dateTime={review.date}>{review.date}</time>
              </div>
            </li>);
        })};
      </ul>
    </>
  );
}

export default Reviews;

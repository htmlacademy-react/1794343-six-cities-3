import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import { getOfferCardState } from './util';

function OfferCard(): JSX.Element {
  const {pathname} = useLocation();
  const {className, classNameInfo, width, height} = getOfferCardState(pathname as AppRoute);

  return (
    <article className={`${className}__card place-card`}>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src="img/room.jpg" width={width} height={height} alt="Place image"/>
        </a>
      </div>
      <div className={`${classNameInfo}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;80</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer}>Wood and stone place</Link>
        </h2>
        <p className="place-card__type">Room</p>
      </div>
    </article>
  );
}

export default OfferCard;

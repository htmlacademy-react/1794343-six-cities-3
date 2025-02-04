import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import cn from 'classnames';
import { getOfferCardState } from './util';
import { OfferType } from './types';
import { makeFirstCharBig } from '../../pages/util';
import { getRating } from '../../pages/util';
import { useAppDispatch } from '../../hooks/use-store';
import { setCurrentOfferId } from '../../store/actions';
import { fetchCurrentOfferAction } from '../../store/api-actions';

type CardProps = {
  offer: OfferType;
  handleMouseHover?: (offer?: OfferType) => void;
}


function OfferCard({offer, handleMouseHover} : CardProps): JSX.Element {
  const {pathname} = useLocation();
  const {className, classNameInfo, width, height} = getOfferCardState(pathname as AppRoute);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentOfferId(offer.id));

    dispatch(fetchCurrentOfferAction());
    navigate(`/offer/${offer.id}`);
  };

  return (
    <article className={`${className}__card place-card`}
      onMouseEnter={() => {
        if (handleMouseHover) {
          handleMouseHover(offer);
        }
      }}
      onMouseLeave={() => {
        if (handleMouseHover) {
          handleMouseHover();
        }
      }}
    >
      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a onClick={handleLinkClick}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${classNameInfo}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button button',
              {'place-card__bookmark-button--active': offer.isFavorite}
            )}
            type="button"
            aria-pressed={offer.isFavorite}
            onClick={() => {/* Логика добавления в закладки */}}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={handleLinkClick}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{makeFirstCharBig(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;

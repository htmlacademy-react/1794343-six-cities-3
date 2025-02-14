import { makeFirstCharBig, isPlural, getRating } from '../helpers.ts';
import { IMAGES_COUNT } from './util.ts';
import Reviews from './reviews.tsx';
import Map from '../../components/map.tsx/index.ts';
import FavoriteButton from '../../components/favorite-button/index.ts';
import { FavoriteButtonPlace } from '../../components/favorite-button/util.ts';
import cn from 'classnames';
import { getCurrentOffer } from '../../store/offer-process/selectors.ts';
import { useAppSelector } from '../../hooks/use-store.ts';
import { OfferType } from '../../helpers/types.ts';

type OfferContentProps = {
  offers: OfferType[];
}

function OfferContent({offers}: OfferContentProps): JSX.Element {
  const offer = useAppSelector(getCurrentOffer) as OfferType;
  const {
    title,
    type,
    price,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults} = offer;
  const shownImages = images.slice(0, IMAGES_COUNT);
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {shownImages.map((url) => (
            <div className="offer__image-wrapper" key={url}>
              <img className="offer__image" src={url} alt="Photo studio"/>
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <FavoriteButton
              offer={offer}
              place={FavoriteButtonPlace.OfferPage}
            />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: `${getRating(rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {makeFirstCharBig(type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {`${bedrooms} Bedroom${isPlural(bedrooms) ? 's' : ''}`}
            </li>
            <li className="offer__feature offer__feature--adults">
              {`Max ${maxAdults} adult${isPlural(maxAdults) ? 's' : ''}`}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={cn(
                'offer__avatar-wrapper user__avatar-wrapper',
                {'offer__avatar-wrapper--pro' : host.isPro}
              )}
              >
                <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
              </div>
              <span className="offer__user-name">
                {host.name}
              </span>
              {host.isPro &&
                    <span className="offer__user-status">
                      Pro
                    </span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {description}
              </p>
            </div>
          </div>
          <Reviews />
        </div>
      </div>
      <Map
        offers={offers}
        activeOffer={offer}
      />
    </section>
  );
}

export default OfferContent;

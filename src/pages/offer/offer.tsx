import {Helmet} from 'react-helmet-async';
import { AuthorizationStatus } from '../../const.ts';
import { makeFirstCharBig, isPlural } from '../util';
import Loading from '../loadig/loading.tsx';
import OffersList from '../../components/offers-list';
import GalleryPic from './gallery-pic';
import Reviews from './reviews';
import IsideList from './inside-list';
import ReviewForm from './review-form';
import FavoriteButton from '../../components/favorite-button/favorite-button.tsx';
import { FavoriteButtonPlace } from '../../components/favorite-button/const.ts';
import NotFound from '../not-found/not-found.tsx';
import { OfferType } from '../../components/offer-card/types';
import Map from '../../components/map.tsx';
import { getShownNearOffers } from './util.ts';
import { getRating } from '../util';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store.ts';
import { useEffect } from 'react';
import { fetchCurrentOfferAction, fetchNearOffersAction, fetchReviewsAction } from '../../store/api-actions.ts';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { getCurrentOffer, getisNotFound, getisOfferLoading, getNearOffers} from '../../store/offer/selectors.ts';

function Offer(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getCurrentOffer) as OfferType;
  const nearOffers = useAppSelector(getNearOffers);
  const isOfferLoading = useAppSelector(getisOfferLoading);
  const isNotFound = useAppSelector(getisNotFound);
  const dispatch = useAppDispatch();
  const offerId = useParams().id;

  useEffect(() => {
    if (typeof offerId === 'string') {
      dispatch(fetchCurrentOfferAction(offerId));
      dispatch(fetchNearOffersAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isNotFound) {
    return <NotFound />;
  }

  if (isOfferLoading) {
    return <Loading />;
  }

  const {
    title,
    type,
    price,
    isPremium,
    rating,
    description,
    bedrooms,
    host,
    maxAdults} = offer;

  const shownNearOffersCards = getShownNearOffers(nearOffers, offer);
  const shownNearOffersMap: OfferType[] = [...shownNearOffersCards, offer];

  return (
    <>
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <GalleryPic offer={offer}/>
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
                <IsideList offer={offer}/>
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
              <section className="offer__reviews reviews">
                <Reviews />
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <ReviewForm />
                ) : null}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={shownNearOffersMap}
              activeOffer={offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList offers={shownNearOffersCards}/>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Offer;

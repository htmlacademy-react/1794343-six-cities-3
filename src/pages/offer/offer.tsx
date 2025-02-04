import {Helmet} from 'react-helmet-async';
import { AuthorizationStatus } from '../../components/const';
import { makeFirstCharBig, isPlural } from '../util';
//import NotFound from '../not-found';
import OffersList from '../../components/offers-list';
import GalleryPic from './gallery-pic';
import Reviews from './reviews';
import IsideList from './inside-list';
import ReviewForm from './review-form';
import { OfferType } from '../../components/offer-card/types';
import { ReviewType } from './types';
import Map from '../../components/map.tsx';
import { getNearOffers } from './util.ts';
import { getRating } from '../util';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store.ts';
import { useEffect } from 'react';
import { fetchCurrentOfferAction } from '../../store/api-actions.ts';


type OfferProps = {
  offers: OfferType[];
  reviews: ReviewType[];
}

function Offer({offers, reviews}: OfferProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentOfferAction()); // Передаем offerId
  }, [dispatch]);

  const offer = useAppSelector((state) => state.currentOffer) as OfferType;
  console.log(offer);
  /*function getOffer (pathname: string) {
    const id = pathname.slice(7);
    if (!id) {
      return <NotFound />;
    }
    const offer = offers.find((offerData) => offerData.id === id);
    if (!offer) {
      return <NotFound />;
    }
    return offer;
  }*/

  //const {pathname} = useLocation();
  //const generalOffer = getOffer(pathname as AppRoute);
  //const offer = generalOffer as OfferType;

  const {host} = offer;

  const shownNearOffersCards = getNearOffers(offers, offer);
  const shownNearOffersMap: OfferType[] = [...shownNearOffersCards, offer];

  return (
    <>
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <GalleryPic offer={offer}/>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${getRating(offer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {makeFirstCharBig(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offer.bedrooms} Bedroom${isPlural(offer.bedrooms) ? 's' : ''}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offer.maxAdults} adult${isPlural(offer.maxAdults) ? 's' : ''}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <IsideList offer={offer}/>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
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
                    {offer.description}
                  </p>
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Reviews reviews={reviews}/>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <ReviewForm
                    offerId={offer.id}
                    onSubmit={() => {
                      throw new Error('Function \'onSubmit\' isn\'t implemented.');
                    }}
                  />
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

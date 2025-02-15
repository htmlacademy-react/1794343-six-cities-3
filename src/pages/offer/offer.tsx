import {Helmet} from 'react-helmet-async';
import { AppRoute } from '../../helpers/const.ts';
import Loading from '../loading/loading.tsx';
import NearPlaces from './near-places.tsx';
import OfferContent from './offer-content.tsx';
import { OfferType } from '../../helpers/types.ts';
import { getShownNearOffers } from './util.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store.ts';
import { useEffect } from 'react';
import { fetchCurrentOfferAction, fetchNearOffersAction, fetchReviewsAction } from '../../store/api-actions.ts';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentOffer, getisNotFound, getisOfferLoading, getNearOffers} from '../../store/offer-process/selectors.ts';


function Offer(): JSX.Element {
  const offer = useAppSelector(getCurrentOffer) as OfferType;
  const nearOffers = useAppSelector(getNearOffers);
  const isOfferLoading = useAppSelector(getisOfferLoading);
  const isNotFound = useAppSelector(getisNotFound);

  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchCurrentOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (isNotFound) {
    navigate(AppRoute.NotFound);
  }

  if (isOfferLoading) {
    return <Loading />;
  }

  const shownNearOffersCards = getShownNearOffers(nearOffers, offer);
  const shownNearOffersMap: OfferType[] = [...shownNearOffersCards, offer];

  return (
    <>
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <OfferContent offers={shownNearOffersMap}/>
        <NearPlaces offers={shownNearOffersCards} />
      </main>
    </>
  );
}

export default Offer;

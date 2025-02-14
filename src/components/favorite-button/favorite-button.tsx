import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { getFavoriteButtonState } from './util';
import { FavoriteButtonPlace } from './util';
import { OfferType } from '../../helpers/types';
import { AppRoute, AuthorizationStatus } from '../../helpers/const';
import { useAppSelector } from '../../hooks/use-store';
import { useAppDispatch } from '../../hooks/use-store';
import { fetchChangeFavorite } from '../../store/api-actions';
import { getFavortiteOffers, getisFavoriteChanging } from '../../store/favorites-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type FavoriteButtonProps = {
  offer: OfferType;
  place: FavoriteButtonPlace;
}

const FavoriteButton = memo(({offer, place} : FavoriteButtonProps): JSX.Element => {
  const {className, width, height} = getFavoriteButtonState(place);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const offers = useAppSelector(getFavortiteOffers);
  const isFavorite = offers.some((currOffer) => currOffer.id === offer.id);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isChanging = useAppSelector(getisFavoriteChanging);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchChangeFavorite({id: offer.id, status: Number(!isFavorite)}));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={cn(
        `${className}__bookmark-button button`,
        {[`${className}__bookmark-button--active`]: isFavorite}
      )}
      type="button"
      aria-pressed={isFavorite}
      onClick={handleClick}
      disabled={isChanging}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;

import OfferCard from '../offer-card';
import { OfferType } from '../offer-card/types';
import { SortingOption } from '../../pages/main/const';

type OfferListProps = {
  currentOption: string;
  offers: OfferType[];
  handleMouseHover?: (offer?: OfferType) => void;
};

function OffersList({currentOption, offers, handleMouseHover}: OfferListProps) {
  let sortedOffers = offers;

  switch (currentOption) {
    case SortingOption.PRICE_INC:
      sortedOffers = offers.toSorted((a, b) => a.price - b.price);
      break;
    case SortingOption.PRICE_DEC:
      sortedOffers = offers.toSorted((a, b) => b.price - a.price);
      break;
    case SortingOption.TOP_RATED:
      sortedOffers = offers.toSorted((a, b) => b.rating - a.rating);
      break;
    default:
      sortedOffers = offers;
  }

  return (
    <>
      {sortedOffers.map((offer) => (
        <OfferCard key={offer.id}
          offer={offer}
          handleMouseHover={handleMouseHover}
        />
      ))}
    </>
  );
}

export default OffersList;

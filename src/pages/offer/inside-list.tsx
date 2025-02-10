import { memo } from 'react';
import { OfferType } from '../../components/offer-card/types';

type IsideListProps = {
  offer: OfferType;
}

const IsideList = memo(({offer}:IsideListProps): JSX.Element => {
  const goods = offer.goods;

  return (
    <ul className="offer__inside-list">
      {goods.map((good) => (
        <li className="offer__inside-item" key={good}>
          {good}
        </li>
      ))}
    </ul>);
});

IsideList.displayName = 'IsideList';

export default IsideList;

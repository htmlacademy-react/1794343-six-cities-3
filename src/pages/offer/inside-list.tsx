import { OfferType } from '../../components/offer-card/types';

type IsideListProps = {
  offer: OfferType;
}

function IsideList({offer}:IsideListProps): JSX.Element {
  const goods = offer.goods;

  return (
    <ul className="offer__inside-list">
      {goods.map((good) => (
        <li className="offer__inside-item" key={good}>
          {good}
        </li>
      ))}
    </ul>);
}

export default IsideList;

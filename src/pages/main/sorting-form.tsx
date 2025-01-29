import cn from 'classnames';
import { SortingOption } from './const';
import { makeFirstCharBig } from '../util';
import { useEffect } from 'react';
import { useBoolean } from '../../hooks/use-boolean';

type SortingFormProps = {
  currentOption: string;
  onOptionChange: (option: string) => void;
}

function SortingForm({currentOption, onOptionChange}: SortingFormProps): JSX.Element {
  const {isOn, off, toggle} = useBoolean(false);
  useEffect(() => {
    //здесь будет слушатель esc кейдаун
  }, [isOn, off]);

  return (
    <form className="places__sorting" action="#" method="get"
      onClick={toggle}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {makeFirstCharBig(currentOption)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn(
          'places__options places__options--custom',
          {'places__options--opened': isOn}
        )}
      >
        {Object.values(SortingOption).map((option) => (
          <li
            className={cn(
              'places__option',
              {'places__option--active': option === currentOption}
            )}
            tabIndex={0}
            key={option}
            onClick={() => onOptionChange(option)}
          >
            {makeFirstCharBig(option)}
          </li>
        ))}
      </ul>
    </form>);
}

export default SortingForm;

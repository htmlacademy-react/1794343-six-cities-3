import { memo } from 'react';
import cn from 'classnames';
import { SortingOption } from './util';
import { makeFirstCharBig } from '../helpers';
import { useBoolean } from '../../hooks/use-boolean';

type SortingFormProps = {
  currentOption: SortingOption;
  onOptionChange: (option: SortingOption) => void;
}

const SortingForm = memo(({currentOption, onOptionChange}: SortingFormProps): JSX.Element => {
  const {isOn, toggle} = useBoolean(false);

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
});

SortingForm.displayName = 'SortingForm';

export default SortingForm;

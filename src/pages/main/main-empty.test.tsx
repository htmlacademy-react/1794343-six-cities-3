import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { cities } from '../../helpers/const';
describe('Component: MainEmpty', () => {
  it('should render correct', () => {
    const city = cities[0];
    const expectedText = /No places to stay available/i;
    const expectedTextWithCity = new RegExp(`We could not find any property available at the moment in ${city}`, 'i');
    render(<MainEmpty currentCity={city}/>);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedTextWithCity)).toBeInTheDocument();
  });
});

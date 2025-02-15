import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: MainEmpty', () => {
  it('should render correct', () => {

    const expectedText1 = /Nothing yet saved/i;
    const expectedText2 = /Save properties to narrow down search or plan your future trips./i;
    render(<FavoritesEmpty />);
    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });
});

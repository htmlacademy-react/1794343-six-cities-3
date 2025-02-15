import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correct', () => {
    const expectedText1 = /Page not found/i;
    const expectedText2 = /Looks like you are lost. Try to return to the main page./i;
    const expectedText3 = /Go to Main Page/i;
    render(
      <MemoryRouter>
        <HelmetProvider>
          <NotFound />
        </HelmetProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
  });
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { OFFERS_COUNT } from './components/const';
import { offersData } from './mocks/offers';
import { reviewsData } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={OFFERS_COUNT}
      offers={offersData}
      reviews={reviewsData}
    />
  </React.StrictMode>
);

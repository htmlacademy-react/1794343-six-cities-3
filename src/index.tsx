import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { offersData } from './mocks/offers';
import { reviewsData } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offersData}
      reviews={reviewsData}
    />
  </React.StrictMode>
);

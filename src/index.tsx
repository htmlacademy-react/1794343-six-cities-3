import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './store';
import { offersData } from './mocks/offers';
import { reviewsData } from './mocks/reviews';

import { fetchOffersAction } from './store/api-acitons';
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offersData}
        reviews={reviewsData}
      />
    </Provider>
  </React.StrictMode>
);
